import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { take, tap } from 'rxjs';
import { numberOperationOptions, textOperationOptions } from 'src/constants';
import { SetReceiptFilter } from 'src/store/receipt-table.actions';
import { ReceiptTableState } from 'src/store/receipt-table.state';

@Component({
  selector: 'app-receipt-filter',
  templateUrl: './receipt-filter.component.html',
  styleUrls: ['./receipt-filter.component.scss'],
})
export class ReceiptFilterComponent implements OnInit {
  public form: FormGroup = new FormGroup({});

  public numberOperationOptions = numberOperationOptions;

  public textOperationOptions = textOperationOptions;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private dialogRef: MatDialogRef<ReceiptFilterComponent>
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    const filter = this.store.selectSnapshot(
      ReceiptTableState.filterData
    ).filter;

    this.form = this.formBuilder.group({
      date: this.buildFieldFormGroup(
        filter?.date?.value,
        filter?.date?.operation
      ),
      amount: this.buildFieldFormGroup(
        filter?.amount?.value,
        filter?.amount?.operation
      ),
      name: this.buildFieldFormGroup(
        filter?.name?.value,
        filter?.name?.operation
      ),
      paidBy: this.buildFieldFormGroup(
        filter?.paidBy?.value ?? [],
        filter?.paidBy?.operation,
        true
      ),
      resolvedDate: this.buildFieldFormGroup(
        filter?.resolvedDate?.value,
        filter?.resolvedDate?.operation
      ),
    });
  }

  private buildFieldFormGroup(
    value: string | string[],
    operation: string,
    isArray?: boolean
  ): FormGroup {
    let control: AbstractControl;
    if (isArray) {
      control = this.formBuilder.array(value as any);
    } else {
      control = this.formBuilder.control(value);
    }

    return this.formBuilder.group({
      operation: operation ?? '',
      value: control,
    });
  }

  public submitButtonClicked(): void {
    const filter = this.form.value;
    this.store
      .dispatch(new SetReceiptFilter(filter))
      .pipe(
        take(1),
        tap(() => {
          this.dialogRef.close(true);
        })
      )
      .subscribe();
  }

  public cancelButtonClicked(): void {
    this.dialogRef.close(false);
  }
}
