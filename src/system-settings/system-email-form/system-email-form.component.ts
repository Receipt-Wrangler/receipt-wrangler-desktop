import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { take, tap } from "rxjs";
import { FormMode } from "../../enums/form-mode.enum";
import { FormConfig } from "../../interfaces";
import { SystemEmail, SystemEmailService } from "../../open-api";
import { SnackbarService } from "../../services";

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
    private router: Router
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
      password: [this.originalSystemEmail?.password, [Validators.required]]
    });
  }

  public submit(): void {
    if (this.formConfig.mode === FormMode.add) {
      this.createSystemEmail();
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
}
