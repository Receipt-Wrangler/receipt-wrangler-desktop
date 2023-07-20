import { take, tap } from "rxjs";
import { SnackbarService } from "src/services/snackbar.service";

import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { User, UserService } from "@noah231515/receipt-wrangler-core";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  @Input() public user!: User;

  public form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<ResetPasswordComponent>,
    private snackbarService: SnackbarService,
    private userService: UserService
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }

  public submit(): void {
    if (this.form.valid) {
      this.userService
        .resetPasswordById(this.form.value, this.user.id)
        .pipe(
          take(1),
          tap(() => {
            this.snackbarService.success('Password successfully set');
            this.matDialogRef.close();
          })
        )
        .subscribe();
    }
  }

  public closeModal(): void {
    this.matDialogRef.close();
  }
}
