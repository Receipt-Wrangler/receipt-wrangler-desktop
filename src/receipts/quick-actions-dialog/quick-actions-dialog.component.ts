import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { RadioButtonData } from "src/radio-group/models";
import { Item, Receipt, User } from "../../open-api";
import { SnackbarService } from "../../services/index";
import { buildItemForm } from "../utils/form.utils";

enum QuickActions {
  "SplitEvenly" = "Split Evenly",
  "SplitEvenlyWithOptionalParts" = "Split Evenly With Portions",
  "SplitByPercentage" = "Split by Percentage",
}

@Component({
  selector: "app-quick-actions-dialog",
  templateUrl: "./quick-actions-dialog.component.html",
  styleUrls: ["./quick-actions-dialog.component.scss"],
  standalone: false
})
export class QuickActionsDialogComponent implements OnInit {
  @Input() public originalReceipt?: Receipt;

  @Input() public usersToOmit: string[] = [];

  @Input() public parentForm!: FormGroup;

  @Input() public amountToSplit!: number;

  @Input() public itemIndex?: number;

  public localForm: FormGroup = new FormGroup({});

  public radioValues: RadioButtonData[] = Object.entries(QuickActions).map(
    (entry) => {
      return {
        displayValue: entry[1],
        value: entry[0],
      } as RadioButtonData;
    }
  );

  public quickActionsEnum = QuickActions;

  public percentageOptions = [25, 50, 75, 100];

  private get usersFormArray(): FormArray {
    return this.localForm.get("usersToSplit") as FormArray;
  }

  private get receiptItems(): FormArray {
    return this.parentForm.get("receiptItems") as FormArray;
  }

  private get targetItemsArray(): FormArray {
    if (this.itemIndex !== undefined) {
      // We're splitting an item, so add to its linkedItems
      const itemFormGroup = this.receiptItems.at(this.itemIndex) as FormGroup;
      let linkedItems = itemFormGroup.get("linkedItems") as FormArray;
      if (!linkedItems) {
        // Create linkedItems FormArray if it doesn't exist
        linkedItems = this.formBuilder.array([]);
        itemFormGroup.addControl("linkedItems", linkedItems);
      }
      return linkedItems;
    } else {
      // We're splitting a receipt, so add to receiptItems
      return this.receiptItems;
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<QuickActionsDialogComponent>,
    private snackbarService: SnackbarService
  ) {}

  public ngOnInit(): void {
    this.initForm();
    this.listenForUserChanges();
    this.listenForQuickActionChanges();
  }

  private initForm(): void {
    this.localForm = this.formBuilder.group({
      quickAction: [this.radioValues[0].value, Validators.required],
      usersToSplit: this.formBuilder.array([], Validators.required),
    });
  }

  private listenForUserChanges(): void {
    this.localForm
      .get("usersToSplit")
      ?.valueChanges.subscribe((users: User[]) => {
      // Remove controls for users that are no longer selected
      const currentUserIds = users.map(u => u.id.toString());
      Object.keys(this.localForm.controls).forEach(key => {
        if (key !== "quickAction" && key !== "usersToSplit") {
          const userId = key.replace("_percentage", "").replace("_customPercentage", "");
          if (!currentUserIds.includes(userId)) {
            this.localForm.removeControl(key);
          }
        }
      });

      // Add controls for new users
      users.forEach((u) => {
        const userId = u.id.toString();

        if (!this.localForm.get(userId)) {
          this.localForm.addControl(userId, new FormControl(1));
        }

        if (!this.localForm.get(`${userId}_percentage`)) {
          const percentageControl = new FormControl(0, [
            Validators.min(0),
            Validators.max(100)
          ]);
          percentageControl.disable();
          this.localForm.addControl(`${userId}_percentage`, percentageControl);
        }

        if (!this.localForm.get(`${userId}_customPercentage`)) {
          const customPercentageControl = new FormControl(false);
          this.localForm.addControl(`${userId}_customPercentage`, customPercentageControl);

          // Subscribe to custom percentage toggle changes
          customPercentageControl.valueChanges.subscribe((isCustom) => {
            const percentageControl = this.localForm.get(`${userId}_percentage`);
            if (isCustom) {
              percentageControl?.enable();
              percentageControl?.setValidators([
                Validators.required,
                Validators.min(0),
                Validators.max(100)
              ]);
            } else {
              percentageControl?.disable();
              percentageControl?.setValue(0);
              percentageControl?.setValidators([
                Validators.min(0),
                Validators.max(100)
              ]);
            }
            percentageControl?.updateValueAndValidity();
          });
        }
      });
    });
  }

  private listenForQuickActionChanges(): void {
    this.localForm.get("quickAction")?.valueChanges.subscribe((selectedAction: string) => {
      // Clear errors on percentage fields when switching away from percentage mode
      if (selectedAction !== this.radioValues[2].value) {
        this.clearPercentageErrors();
      }
    });
  }

  private clearPercentageErrors(): void {
    Object.keys(this.localForm.controls).forEach(key => {
      if (key.endsWith("_percentage")) {
        const control = this.localForm.get(key);
        if (control) {
          control.markAsUntouched();
          control.markAsPristine();
          control.setErrors(null);
        }
      }
    });
  }

  public addSplits(): void {
    if (this.amountToSplit < 0 || !this.amountToSplit) {
      this.snackbarService.error("Amount to split does not exist or is invalid!");
      return;
    }

    if (this.localForm.get("quickAction")?.value === this.radioValues[2].value) {
      if (!this.validatePercentages()) {
        return;
      }
    }

    if (this.localForm.valid) {
      if (
        this.localForm.get("quickAction")?.value === this.radioValues[0].value
      ) {
        this.addEvenSplitItems();
      } else if (
        this.localForm.get("quickAction")?.value === this.radioValues[1].value
      ) {
        this.splitEvenlyWithOptionalParts();
      } else if (
        this.localForm.get("quickAction")?.value === this.radioValues[2].value
      ) {
        this.splitByPercentage();
      }
      this.dialogRef.close(true);
    }
  }

  private addEvenSplitItems(): void {
    const users: User[] = this.usersFormArray.controls.map((c) => c.value);

    users.forEach((u) => {
      const item = this.buildSplitItem(
        u,
        `${u.displayName}'s Even Portion`,
        Number.parseFloat((this.amountToSplit / users.length).toFixed(2))
      );

      const formGroup = buildItemForm(
        item,
        this.originalReceipt?.id?.toString(),
        true
      );
      this.targetItemsArray.push(formGroup);
    });
  }

  private splitEvenlyWithOptionalParts(): void {
    let amount = this.amountToSplit;
    const users: User[] = this.usersFormArray.value;

    // Build optional parts first
    users.forEach((u) => {
      const userOptionalPart = Number.parseFloat(
        this.localForm.get(u.id.toString())?.value
      );
      if (!Number.isNaN(userOptionalPart) && Number(userOptionalPart) > 0) {
        amount -= userOptionalPart;
        const item = this.buildSplitItem(
          u,
          `${u.displayName}'s Portion`,
          this.localForm.get(u.id.toString())?.value
        );
        const formGroup = buildItemForm(
          item,
          this.originalReceipt?.id?.toString(),
          true
        );

        this.receiptItems.push(formGroup);
      }
    });

    // Build even split items
    const users2: User[] = this.usersFormArray.controls.map((c) => c.value);
    users2.forEach((u) => {
      const item = this.buildSplitItem(
        u,
        `${u.displayName}'s Even Portion`,
        Number.parseFloat((amount / users2.length).toFixed(2))
      );

      const formGroup = buildItemForm(
        item,
        this.originalReceipt?.id?.toString(),
        true
      );
      this.targetItemsArray.push(formGroup);
    });
  }

  private buildSplitItem(u: User, name: string, amount: number): Item {
    return {
      name: name,
      chargedToUserId: u.id,
      receiptId: this.originalReceipt?.id,
      amount: amount,
    } as any as Item;
  }

  private validatePercentages(): boolean {
    const users: User[] = this.usersFormArray.value;
    let totalPercentage = 0;

    for (const user of users) {
      const percentageControl = this.localForm.get(`${user.id.toString()}_percentage`);
      const customControl = this.localForm.get(`${user.id.toString()}_customPercentage`);
      const isCustom = customControl?.value;
      const percentage = Number.parseFloat(percentageControl?.value ?? 0);

      // Check if custom percentage is enabled but field is empty
      if (isCustom && percentageControl?.enabled && !percentageControl?.value) {
        this.snackbarService.error(`Please enter a percentage for ${user.displayName}!`);
        return false;
      }

      // Only validate enabled controls or controls with values > 0
      if (percentageControl?.enabled || percentage > 0) {
        if (percentage < 0 || percentage > 100) {
          this.snackbarService.error(`Percentage for ${user.displayName} must be between 0 and 100!`);
          return false;
        }
      }

      totalPercentage += percentage;
    }

    if (totalPercentage <= 0) {
      this.snackbarService.error("Total percentage must be greater than 0!");
      return false;
    }

    if (totalPercentage > 100) {
      this.snackbarService.error("Total percentage cannot exceed 100!");
      return false;
    }

    return true;
  }

  private splitByPercentage(): void {
    const users: User[] = this.usersFormArray.value;
    const receiptAmount = this.amountToSplit;

    users.forEach((user) => {
      const percentage = Number.parseFloat(
        this.localForm.get(`${user.id.toString()}_percentage`)?.value ?? 0
      );

      if (percentage > 0) {
        const amount = Number.parseFloat(((receiptAmount * percentage) / 100).toFixed(2));
        const item = this.buildSplitItem(
          user,
          `${user.displayName}'s ${percentage}% Portion`,
          amount
        );

        const formGroup = buildItemForm(
          item,
          this.originalReceipt?.id?.toString(),
          true
        );
        this.receiptItems.push(formGroup);
      }
    });
  }

  public setPercentage(userId: string, percentage: number): void {
    const percentageControl = this.localForm.get(`${userId}_percentage`);
    const customControl = this.localForm.get(`${userId}_customPercentage`);

    customControl?.setValue(false);
    percentageControl?.enable();
    percentageControl?.setValue(percentage);
    percentageControl?.setValidators([
      Validators.min(0),
      Validators.max(100)
    ]);
    percentageControl?.updateValueAndValidity();
    percentageControl?.disable();
  }


  public closeDialog(): void {
    this.dialogRef.close(false);
  }
}
