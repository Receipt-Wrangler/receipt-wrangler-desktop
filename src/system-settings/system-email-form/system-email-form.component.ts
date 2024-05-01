import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { take, tap } from "rxjs";
import { FormMode } from "../../enums/form-mode.enum";
import { FormConfig } from "../../interfaces";
import { CheckEmailConnectivityCommand, SystemEmail, SystemEmailService } from "../../open-api";
import { SnackbarService } from "../../services";
import { ConfirmationDialogComponent } from "../../shared-ui/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-system-email-form",
  templateUrl: "./system-email-form.component.html",
  styleUrl: "./system-email-form.component.scss"
})
export class SystemEmailFormComponent implements OnInit {
  public formConfig!: FormConfig;

  public form!: FormGroup;

  public originalSystemEmail!: SystemEmail;

  protected readonly FormMode = FormMode;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private systemEmailService: SystemEmailService,
    private snackbarService: SnackbarService,
    private router: Router,
    public matDialog: MatDialog
  ) {}

  public ngOnInit() {
    this.formConfig = this.activatedRoute.snapshot.data["formConfig"];
    this.originalSystemEmail = this.activatedRoute.snapshot.data["systemEmail"];
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      host: [this.originalSystemEmail?.host, [Validators.required]],
      port: [this.originalSystemEmail?.port, [Validators.required]],
      username: [this.originalSystemEmail?.username, [Validators.required]],
      password: [null, this.formConfig.mode === FormMode.add ? [Validators.required] : []],
    });
  }

  public submit(): void {
    if (this.formConfig.mode === FormMode.add) {
      this.createSystemEmail();
    } else if (this.formConfig.mode === FormMode.edit) {
      this.updateSystemEmail();
    }
  }

  private createSystemEmail(): void {
    this.systemEmailService.createSystemEmail(this.form.value)
      .pipe(
        take(1),
        tap((systemEmail) => {
          this.snackbarService.success("System Email created successfully");
          this.router.navigateByUrl(`/system-settings/system-emails/${systemEmail.id}/view`);
        })
      )
      .subscribe();
  }

  private updateSystemEmail(): void {
    if (this.form.get("password")?.dirty) {
      const dialogRef = this.matDialog.open(ConfirmationDialogComponent);
      dialogRef.componentInstance.headerText = "Update email password";
      dialogRef.componentInstance.dialogContent = "Are you sure you want to update the email password? This will replace the previous password.";

      dialogRef.afterClosed()
        .pipe(
          take(1),
          tap((result) => {
            this.callUpdateEndpoint(result);
          })
        )
        .subscribe();

    } else {
      this.callUpdateEndpoint(false);
    }
  }

  private callUpdateEndpoint(updatePassword: boolean): void {
    this.systemEmailService.updateSystemEmailById(this.originalSystemEmail.id, updatePassword, this.form.value)
      .pipe(
        take(1),
        tap(() => {
          this.snackbarService.success("System Email updated successfully");
          this.router.navigateByUrl(`/system-settings/system-emails/${this.originalSystemEmail.id}/view`);
        })
      )
      .subscribe();
  }

  public checkEmailConnectivity(): void {
    const showSuccessSnackbar = () => this.snackbarService.success("Successfully connected to email server");

    if (this.formConfig.mode === FormMode.add && this.form.valid) {
      this.systemEmailService.checkSystemEmailConnectivity(this.form.value).pipe(
        take(1),
        tap(() => {
          showSuccessSnackbar();
        })
      ).subscribe();
    } else {
      const command: CheckEmailConnectivityCommand = { id: this.originalSystemEmail.id };
      this.systemEmailService.checkSystemEmailConnectivity(command)
        .pipe(
          take(1),
          tap(() => {
            showSuccessSnackbar();
          })
        ).subscribe();
    }
  }
}
