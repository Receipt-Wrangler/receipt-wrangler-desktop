import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models';

@Component({
  selector: 'app-dummy-user-conversion-dialog',
  templateUrl: './dummy-user-conversion-dialog.component.html',
  styleUrls: ['./dummy-user-conversion-dialog.component.scss'],
})
export class DummyUserConversionDialogComponent implements OnInit {
  @Input() public user!: User;

  public form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<DummyUserConversionDialogComponent>
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }

  public submitButtonClicked(): void {
    if (this.form.valid) {
    }
  }

  public cancelButtonClicked(): void {
    this.matDialogRef.close(false);
  }
}
