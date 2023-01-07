import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private matSnackbar: MatSnackBar,
    private dialogRef: MatDialogRef<QuickActionsDialogComponent>
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.localForm = this.formBuilder.group({
      quickAction: [this.radioValues[0].value, Validators.required],
      usersToSplit: this.formBuilder.array([], Validators.required),
    });

    this.localForm
      .get('quickAction')
      ?.valueChanges.subscribe((v) => console.warn(v));
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
    const receiptAmount = Number.parseInt(
      this.parentForm.get('amount')?.value ?? 1
    );
    const receiptItems = this.parentForm.get('receiptItems') as FormArray;
    const users: User[] =
      (this.localForm.get('usersToSplit') as FormArray)?.controls?.map(
        (c) => c.value
      ) ?? [];

    users.forEach((u) => {
      const item = {
        name: `${u.displayName}'s even Split`,
        chargedToUserId: u.id,
        receiptId: this.originalReceipt?.id,
        amount: Number.parseFloat((receiptAmount / users.length).toFixed(2)),
      } as Item;

      const formGroup = buildItemForm(
        item,
        this.originalReceipt?.id.toString()
      );
      receiptItems.push(formGroup);
    });
  }

  // TODO: implement split even with optional parts
  private splitEvenlyWithOptionalParts(): void {}
}
