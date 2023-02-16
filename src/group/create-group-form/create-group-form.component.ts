import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-group-form',
  templateUrl: './create-group-form.component.html',
  styleUrls: ['./create-group-form.component.scss'],
})
export class CreateGroupFormComponent {
  public form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<CreateGroupFormComponent>
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: '',
    });
  }

  public closeModal(): void {
    this.matDialogRef.close();
  }
}
