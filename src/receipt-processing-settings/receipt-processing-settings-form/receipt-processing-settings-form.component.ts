import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { take, tap } from "rxjs";
import { BaseFormComponent } from "../../form";
import { FormOption } from "../../interfaces/form-option.interface";
import { AiType, OcrEngine, Prompt, ReceiptProcessingSettings, ReceiptProcessingSettingsService } from "../../open-api";
import { SnackbarService } from "../../services";

@Component({
  selector: "app-receipt-processing-settings-form",
  templateUrl: "./receipt-processing-settings-form.component.html",
  styleUrl: "./receipt-processing-settings-form.component.scss"
})
export class ReceiptProcessingSettingsFormComponent extends BaseFormComponent implements OnInit {
  public readonly originalReceiptProcessingSettings?: ReceiptProcessingSettings;

  protected readonly AiType = AiType;

  protected readonly openAiGeminiSpecificFields: string[] = ["key"];

  protected readonly openAiCustomSpecificFields: string[] = ["url", "model"];

  public readonly aiTypeOptions: FormOption[] = [
    {
      value: AiType.OpenAi,
      displayValue: "OpenAI"
    },
    {
      value: AiType.OpenAiCustom,
      displayValue: "OpenAI Custom",
    },
    {
      value: AiType.Gemini,
      displayValue: "Gemini",
    },
  ];

  public readonly ocrEngineOptions: FormOption[] = [
    {
      value: OcrEngine.Tesseract,
      displayValue: "Tesseract",
    },
    {
      value: OcrEngine.EasyOcr,
      displayValue: "EasyOCR",
    }
  ];

  public prompts: Prompt[] = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private receiptProcessingSettingsService: ReceiptProcessingSettingsService,
    private router: Router,
    private snackbarService: SnackbarService,
  ) {
    super();
  }


  public ngOnInit(): void {
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

    this.form.get("key")?.setValidators(Validators.required);
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
    if (this.form.valid && !this.originalReceiptProcessingSettings) {
      const formValue = this.form.value;
      formValue["numWorkers"] = Number(formValue["numWorkers"]);
      this.receiptProcessingSettingsService.createReceiptProcessingSettings(this.form.value)
        .pipe(
          take(1),
          tap((settings) => {
            this.router.navigate([`system-settings/receipt-processing-settings/${settings.id}/view`]);
            this.snackbarService.success("Receipt processing settings created successfully");
          })
        ).subscribe();
    }
  }

}
