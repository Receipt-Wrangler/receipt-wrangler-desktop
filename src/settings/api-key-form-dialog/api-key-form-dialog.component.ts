import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { take, tap } from "rxjs";
import { ApiKeyResult, ApiKeyScope, ApiKeyService, UpsertApiKeyCommand } from "../../open-api";
import { SnackbarService } from "../../services";

@Component({
  selector: "app-api-key-form-dialog",
  templateUrl: "./api-key-form-dialog.component.html",
  styleUrls: ["./api-key-form-dialog.component.scss"],
  standalone: false
})
export class ApiKeyFormDialogComponent implements OnInit {
  public form!: FormGroup;
  public apiKeyResult?: ApiKeyResult;
  public apiKeyScopes = [
    { value: ApiKeyScope.R, label: "Read" },
    { value: ApiKeyScope.W, label: "Write" },
    { value: ApiKeyScope.Rw, label: "Read/Write" }
  ];

  constructor(
    private dialogRef: MatDialogRef<ApiKeyFormDialogComponent>,
    private formBuilder: FormBuilder,
    private apiKeyService: ApiKeyService,
    private snackbarService: SnackbarService
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      description: [""],
      scope: [ApiKeyScope.R, Validators.required]
    });
  }

  public submitButtonClicked(): void {
    if (this.form.valid) {
      const command: UpsertApiKeyCommand = this.form.value;

      this.apiKeyService.createApiKey(command)
        .pipe(
          take(1),
          tap((result: ApiKeyResult) => {
            this.apiKeyResult = result;
            this.snackbarService.success("API key created successfully");
          })
        )
        .subscribe();
    } else {
      this.snackbarService.error("Please fill in all required fields");
    }
  }

  public cancelButtonClicked(): void {
    this.dialogRef.close();
  }

  public copyToClipboard(): void {
    if (this.apiKeyResult?.key) {
      navigator.clipboard.writeText(this.apiKeyResult.key).then(() => {
        this.snackbarService.success("API key copied to clipboard");
      }).catch(() => {
        this.snackbarService.error("Failed to copy API key to clipboard");
      });
    }
  }

  public closeDialog(): void {
    this.dialogRef.close(this.apiKeyResult);
  }
}