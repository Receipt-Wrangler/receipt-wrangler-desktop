import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RadioButtonData } from "src/radio-group/models";
import { Item, Receipt, User } from "../../open-api";
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

  constructor(
    private formBuilder: FormBuilder,
    private matSnackbar: MatSnackBar,
    private dialogRef: MatDialogRef<QuickActionsDialogComponent>
  ) {}

  public ngOnInit(): void {
    this.initForm();
    this.listenForUserChanges();
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
      users.forEach((u) => {
        if (!this.localForm.get(u.id.toString())) {
          this.localForm.addControl(u.id.toString(), new FormControl(1));
        }
        if (!this.localForm.get(`${u.id.toString()}_percentage`)) {
          const percentageControl = new FormControl(0, [
            Validators.required,
            Validators.min(0),
            Validators.max(100),
            Validators.pattern(/^\d+(\.\d{1,2})?$/)
          ]);
          percentageControl.disable();
          this.localForm.addControl(`${u.id.toString()}_percentage`, percentageControl);
        }
        if (!this.localForm.get(`${u.id.toString()}_customPercentage`)) {
          const customPercentageControl = new FormControl(false);
          this.localForm.addControl(`${u.id.toString()}_customPercentage`, customPercentageControl);

          // Subscribe to custom percentage toggle changes
          customPercentageControl.valueChanges.subscribe((isCustom: any) => {
            const percentageControl = this.localForm.get(`${u.id.toString()}_percentage`);
            if (isCustom) {
              percentageControl?.enable();
            } else {
              percentageControl?.disable();
              percentageControl?.setValue(0);
            }
          });
        }
      });
    });
  }

  public addSplits(): void {
    const receiptAmount = Number.parseFloat(
      this.parentForm.get("amount")?.value
    );
    if (receiptAmount < 0 || !receiptAmount) {
      this.matSnackbar.open("Receipt amount does not exist or is invalid!");
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

  private addEvenSplitItems(amount?: number): void {
    const users: User[] = this.usersFormArray.controls.map((c) => c.value);
    const receiptAmount =
      amount ?? Number.parseFloat(this.parentForm.get("amount")?.value ?? 1);

    users.forEach((u) => {
      const item = this.buildSplitItem(
        u,
        `${u.displayName}'s Even Portion`,
        Number.parseFloat((receiptAmount / users.length).toFixed(2))
      );

      const formGroup = buildItemForm(
        item,
        this.originalReceipt?.id?.toString()
      );
      this.receiptItems.push(formGroup);
    });
  }

  private splitEvenlyWithOptionalParts(): void {
    let amount = Number.parseFloat(this.parentForm.get("amount")?.value);
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
          this.originalReceipt?.id?.toString()
        );

        this.receiptItems.push(formGroup);
      }
    });

    // Build even split items
    this.addEvenSplitItems(amount);
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
      const percentage = Number.parseFloat(
        this.localForm.get(`${user.id.toString()}_percentage`)?.value ?? 0
      );

      if (percentage < 0 || percentage > 100) {
        this.matSnackbar.open(`Percentage for ${user.displayName} must be between 0 and 100!`);
        return false;
      }

      totalPercentage += percentage;
    }

    if (totalPercentage <= 0) {
      this.matSnackbar.open("Total percentage must be greater than 0!");
      return false;
    }

    if (totalPercentage > 100) {
      this.matSnackbar.open("Total percentage cannot exceed 100!");
      return false;
    }

    return true;
  }

  private splitByPercentage(): void {
    const users: User[] = this.usersFormArray.value;
    const receiptAmount = Number.parseFloat(this.parentForm.get("amount")?.value);

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
          this.originalReceipt?.id?.toString()
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
    percentageControl?.disable();
  }


  public closeDialog(): void {
    this.dialogRef.close(false);
  }
}
