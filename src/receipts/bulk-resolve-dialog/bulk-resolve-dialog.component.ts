import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bulk-resolve-dialog',
  templateUrl: './bulk-resolve-dialog.component.html',
  styleUrls: ['./bulk-resolve-dialog.component.scss'],
})
export class BulkResolveDialogComponent implements OnInit {
  public form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<BulkResolveDialogComponent>
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      comment: '',
    });
  }

  public cancelButtonClicked(): void {
    this.matDialogRef.close(undefined);
  }

  public submitButtonClicked(): void {
    this.matDialogRef.close(this.form.value);
  }
}
