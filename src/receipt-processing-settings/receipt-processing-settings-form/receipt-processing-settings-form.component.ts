import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { take, tap } from "rxjs";
import { DEFAULT_DIALOG_CONFIG } from "../../constants";
import { FormMode } from "../../enums/form-mode.enum";
import { BaseFormComponent } from "../../form";
import { FormOption } from "../../interfaces/form-option.interface";
import { AiType, Prompt, ReceiptProcessingSettings, ReceiptProcessingSettingsService } from "../../open-api";
import { SnackbarService } from "../../services";
import { ConfirmationDialogComponent } from "../../shared-ui/confirmation-dialog/confirmation-dialog.component";
import { aiTypeOptions } from "../constants/ai-type-options";
import { ocrEngineOptions } from "../constants/ocr-engine-options";

@Component({
  selector: "app-receipt-processing-settings-form",
  templateUrl: "./receipt-processing-settings-form.component.html",
  styleUrl: "./receipt-processing-settings-form.component.scss"
})
export class ReceiptProcessingSettingsFormComponent extends BaseFormComponent implements OnInit {
  public originalReceiptProcessingSettings?: ReceiptProcessingSettings;

  protected readonly AiType = AiType;

  protected readonly openAiGeminiSpecificFields: string[] = ["key"];

  protected readonly openAiCustomSpecificFields: string[] = ["url", "model"];

  public readonly aiTypeOptions: FormOption[] = aiTypeOptions;

  public readonly ocrEngineOptions: FormOption[] = ocrEngineOptions;

  public prompts: Prompt[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private receiptProcessingSettingsService: ReceiptProcessingSettingsService,
    private router: Router,
    private snackbarService: SnackbarService,
    private dialog: MatDialog
  ) {
    super();
  }


  public ngOnInit(): void {
    this.originalReceiptProcessingSettings = this.activatedRoute?.snapshot?.data?.["receiptProcessingSettings"];
    this.prompts = this.activatedRoute.snapshot.data["prompts"];
    this.setFormConfigFromRoute(this.activatedRoute);
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [this.originalReceiptProcessingSettings?.name, Validators.required],
      description: [this.originalReceiptProcessingSettings?.description],
      numWorkers: [this.originalReceiptProcessingSettings?.numWorkers ?? 1, [Validators.required, Validators.min(1)]],
      ocrEngine: [this.originalReceiptProcessingSettings?.ocrEngine, Validators.required],
      aiType: [this.originalReceiptProcessingSettings?.aiType, Validators.required],
      promptId: [this.originalReceiptProcessingSettings?.promptId, Validators.required],
      key: [this.originalReceiptProcessingSettings?.key],
      url: [this.originalReceiptProcessingSettings?.url],
      model: [this.originalReceiptProcessingSettings?.model],
    });

    this.listenForTypeChange();

    if (this.formConfig.mode === FormMode.view) {
      this.form.get("ocrEngine")?.disable();
      this.form.get("aiType")?.disable();
      this.form.get("promptId")?.disable();
    }
  }

  private listenForTypeChange(): void {
    this.form.get("aiType")?.valueChanges
      .pipe(
        tap((type: AiType) => {
          switch (type) {
            case AiType.Gemini:
            case AiType.OpenAi:
              this.updateOpenAiGeminiForm();
              break;
            case AiType.OpenAiCustom:
              this.updateOpenAiCustomForm();
              break;
          }
        })
      )
      .subscribe();
  }

  private updateOpenAiGeminiForm(): void {
    this.openAiCustomSpecificFields.forEach((field: string) => {
      this.form.get(field)?.setValidators(null);
      this.form.get(field)?.setErrors(null);
    });

    const originalType = this.originalReceiptProcessingSettings?.aiType;
    if (this.formConfig.mode === FormMode.edit && (originalType !== AiType.OpenAi || originalType !== AiType.Gemini)) {
      this.form.get("key")?.setValidators(Validators.required);
    }
  }

  private updateOpenAiCustomForm(): void {
    this.openAiGeminiSpecificFields.forEach((field: string) => {
      this.form.get(field)?.setValidators(null);
      this.form.get(field)?.setErrors(null);
    });

    this.form.get("url")?.setValidators(Validators.required);
  }

  public promptDisplayWith(promptId: number): string {
    if (promptId) {
      const prompt = this.prompts.find((p) => p.id === promptId);
      return prompt?.name ?? "";
    }

    return "";

  }

  public submit(): void {
    const formValue = this.form.value;
    formValue["numWorkers"] = Number(formValue["numWorkers"]);

    if (this.form.valid && !this.originalReceiptProcessingSettings) {
      this.createSettings();
    } else if (this.form.valid) {
      this.updateSettings();
    }
  }

  private createSettings(): void {
    this.receiptProcessingSettingsService.createReceiptProcessingSettings(this.form.value)
      .pipe(
        take(1),
        tap((settings) => {
          this.router.navigate([`system-settings/receipt-processing-settings/${settings.id}/view`]);
          this.snackbarService.success("Receipt processing settings created successfully");
        })
      ).subscribe();

  }

  private updateSettings(): void {
    if (this.form.get("key")?.dirty) {
      this.showConfirmationDialog();
    } else {
      this.callUpdateApi(false);
    }
  }

  private showConfirmationDialog(): void {
    const ref = this.dialog.open(ConfirmationDialogComponent, DEFAULT_DIALOG_CONFIG);

    ref.componentInstance.headerText = "Update Key";
    ref.componentInstance.dialogContent = "Are you sure you want to update the key? This will replace the previous key.";

    ref.afterClosed()
      .pipe(
        take(1),
        tap((confirmed) => {
          this.callUpdateApi(confirmed);

        })
      )
      .subscribe();
  }

  private callUpdateApi(updateKey: boolean): void {
    this.receiptProcessingSettingsService.updateReceiptProcessingSettingsById(
      this.originalReceiptProcessingSettings?.id ?? 0,
      updateKey,
      this.form.value)
      .pipe(
        take(1),
        tap(() => {
          this.router.navigate([`system-settings/receipt-processing-settings/${this.originalReceiptProcessingSettings?.id}/view`]);
          this.snackbarService.success("Receipt processing settings updated successfully");
        })
      )
      .subscribe();
  }

}
