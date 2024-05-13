import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BaseFormComponent } from "../../form";
import { FormOption } from "../../interfaces/form-option.interface";
import { AiType, ReceiptProcessingSettings } from "../../open-api";

@Component({
  selector: "app-receipt-processing-settings-form",
  templateUrl: "./receipt-processing-settings-form.component.html",
  styleUrl: "./receipt-processing-settings-form.component.scss"
})
export class ReceiptProcessingSettingsFormComponent extends BaseFormComponent implements OnInit {
  public originalReceiptProcessingSettings?: ReceiptProcessingSettings;

  public aiTypeOptions: FormOption[] = [
    {
      value: AiType.Openai,
      displayValue: "OpenAI"
    },
    {
      value: AiType.OpenaiCustom,
      displayValue: "OpenAI Custom",
    },
    {
      value: AiType.Gemini,
      displayValue: "Gemini",
    },
  ];

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    super();
  }


  public ngOnInit(): void {
    this.setFormConfigFromRoute(this.activatedRoute);
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [this.originalReceiptProcessingSettings?.name, Validators.required],
      description: [this.originalReceiptProcessingSettings?.description],
      aiType: [this.originalReceiptProcessingSettings?.aiType, Validators.required],
    });
  }

  public submit(): void {

  }
}
