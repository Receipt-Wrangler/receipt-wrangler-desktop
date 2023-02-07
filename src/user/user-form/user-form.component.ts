import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRole } from 'src/enums/user_role.enum';
import { User } from 'src/models';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() public user!: User;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<UserFormComponent>
  ) {}

  public form: FormGroup = new FormGroup({});

  public userRoleOptions: string[] = [];

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.userRoleOptions = Object.keys(UserRole);
    this.form = this.formBuilder.group({
      displayName: [this.user?.displayName ?? '', Validators.required],
      username: [this.user?.username ?? '', Validators.required],
      userRole: [this.user?.userRole ?? '', Validators.required],
    });
  }

  public submit(): void {
    if (this.form.valid) {
    }
  }

  public closeModal(): void {
    this.matDialogRef.close();
  }
}
