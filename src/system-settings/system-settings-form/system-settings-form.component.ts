import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BaseFormComponent } from "../../form";
import { ReceiptProcessingSettings, SystemSettings } from "../../open-api";

@Component({
  selector: "app-system-settings-form",
  templateUrl: "./system-settings-form.component.html",
  styleUrl: "./system-settings-form.component.scss"
})
export class SystemSettingsFormComponent extends BaseFormComponent implements OnInit {
  public originalSystemSettings!: SystemSettings;

  public allReceiptProcessingSettings!: ReceiptProcessingSettings[];

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
    super();
  }

  public ngOnInit(): void {
    this.setFormConfigFromRoute(this.activatedRoute);
    this.allReceiptProcessingSettings = this.activatedRoute.snapshot.data?.["allReceiptProcessingSettings"];
    this.originalSystemSettings = this.activatedRoute.snapshot.data?.["systemSettings"];
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      enableLocalSignUp: [this.originalSystemSettings?.enableLocalSignUp],
      emailPollingInterval: [this.originalSystemSettings?.emailPollingInterval, [Validators.required, Validators.min(0)]],
      receiptProcessingSettingsId: [this.originalSystemSettings?.receiptProcessingSettingsId],
      fallbackReceiptProcessingSettingsId: [this.originalSystemSettings?.fallbackReceiptProcessingSettingsId]
    });
  }

  public displayWith(id: number): string {
    return this.allReceiptProcessingSettings.find((rps) => rps.id === id)?.name ?? "";
  }

  public submit(): void {

  }
}
