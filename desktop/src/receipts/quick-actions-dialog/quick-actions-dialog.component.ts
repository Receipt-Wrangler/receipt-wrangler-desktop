import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Receipt } from 'src/models';
import { Item } from 'src/models/item';
import { User } from 'src/models/user';
import { RadioButtonData } from 'src/radio-group/models';
import { buildItemForm } from '../utils/form.utils';

enum QuickActions {
  'SplitEvenly' = 'Split Evenly',
  'SplitEvenlyWithOptionalParts' = 'Split Evenly With Optional Parts',
}

@Component({
  selector: 'app-quick-actions-dialog',
  templateUrl: './quick-actions-dialog.component.html',
  styleUrls: ['./quick-actions-dialog.component.scss'],
})
export class QuickActionsDialogComponent implements OnInit {
  @Input() public originalReceipt?: Receipt;

  public parentForm!: FormGroup;

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

  private get usersFormArray(): FormArray {
    return this.localForm.get('usersToSplit') as FormArray;
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
      .get('usersToSplit')
      ?.valueChanges.subscribe((users: User[]) => {
        users.forEach((u) => {
          if (!this.localForm.get(u.id.toString())) {
            this.localForm.addControl(u.id.toString(), new FormControl(1));
          }
        });
      });
  }

  public addSplits(): void {
    const receiptAmount = Number.parseInt(this.parentForm.get('amount')?.value);
    if (receiptAmount < 0 || !receiptAmount) {
      this.matSnackbar.open('Receipt amount does not exist or is invalid!');
      return;
    }

    if (this.localForm.valid) {
      if (
        this.localForm.get('quickAction')?.value === this.radioValues[0].value
      ) {
        this.splitEvenly();
      } else {
        this.splitEvenlyWithOptionalParts();
        console.warn('split with parts');
      }
      this.dialogRef.close(true);
    }
  }

  private splitEvenly(): void {
    this.addEvenSplitItems();
  }

  // TODO: implement split even with optional parts
  private splitEvenlyWithOptionalParts(): void {
    let amount = Number.parseFloat(this.parentForm.get('amount')?.value);
    const users: User[] = this.usersFormArray.value;
    const items = this.parentForm.get('receiptItems') as FormArray;

    // Build optional parts first
    users.forEach((u) => {
      const userOptionalPart = Number.parseFloat(
        this.localForm.get(u.id.toString())?.value
      );
      if (!Number.isNaN(userOptionalPart)) {
        amount -= userOptionalPart;
        const item = this.buildSplitItem(
          u,
          `${u.displayName}'s Optional Part`,
          this.localForm.get(u.id.toString())?.value
        );
        const formGroup = buildItemForm(
          item,
          this.originalReceipt?.id?.toString()
        );

        items.push(formGroup);
      }
    });

    // Build even split items
    this.addEvenSplitItems(amount);
    console.warn(this.parentForm.get('receiptItems')?.value);
  }

  private addEvenSplitItems(amount?: number): void {
    const users: User[] = this.usersFormArray.controls.map((c) => c.value);
    const receiptAmount =
      amount ?? Number.parseInt(this.parentForm.get('amount')?.value ?? 1);
    const receiptItems = this.parentForm.get('receiptItems') as FormArray;

    users.forEach((u) => {
      const item = this.buildSplitItem(
        u,
        `${u.displayName}'s even Split`,
        Number.parseFloat((receiptAmount / users.length).toFixed(2))
      );

      const formGroup = buildItemForm(
        item,
        this.originalReceipt?.id?.toString()
      );
      receiptItems.push(formGroup);
    });
  }

  private buildSplitItem(u: User, name: string, amount: number): Item {
    return {
      name: name,
      chargedToUserId: u.id,
      receiptId: this.originalReceipt?.id,
      amount: amount,
    } as Item;
  }
}
