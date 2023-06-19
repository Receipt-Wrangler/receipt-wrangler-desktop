import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { take, tap } from 'rxjs';
import { SetReceiptFilter } from 'src/store/receipt-table.actions';
import { ReceiptTableState } from 'src/store/receipt-table.state';

@Component({
  selector: 'app-receipt-filter',
  templateUrl: './receipt-filter.component.html',
  styleUrls: ['./receipt-filter.component.scss'],
})
export class ReceiptFilterComponent implements OnInit {
  public form: FormGroup = new FormGroup({});

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
      name: this.buildFieldFormGroup(filter.name.value, filter.name.operation),
      paidBy: this.buildFieldFormGroup(
        filter.paidBy.value,
        filter.paidBy.operation
      ),
    });
  }

  private buildFieldFormGroup(value: string, operation: string): FormGroup {
    return this.formBuilder.group({
      operation: operation,
      value: value,
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
