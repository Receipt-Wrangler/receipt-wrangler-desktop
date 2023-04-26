import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RECEIPT_STATUS_OPTIONS } from 'constants/receipt-status-options';
import { ReceiptStatus } from 'src/enums/receipt-status.enum';

@Component({
  selector: 'app-bulk-resolve-dialog',
  templateUrl: './bulk-resolve-dialog.component.html',
  styleUrls: ['./bulk-resolve-dialog.component.scss'],
})
export class BulkResolveDialogComponent implements OnInit {
  public form: FormGroup = new FormGroup({});

  public receiptStatusOptions = RECEIPT_STATUS_OPTIONS;

  constructor(
    private formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<BulkResolveDialogComponent>
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      status: [ReceiptStatus.RESOLVED, Validators.required],
      comment: '',
    });
  }

  public cancelButtonClicked(): void {
    this.matDialogRef.close(undefined);
  }

  public submitButtonClicked(): void {
    if (this.form.valid) {
      this.matDialogRef.close(this.form.value);
    }
  }
}
