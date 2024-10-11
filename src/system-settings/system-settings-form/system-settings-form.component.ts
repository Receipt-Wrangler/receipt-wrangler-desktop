import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Store } from "@ngxs/store";
import { startWith, switchMap, take, tap } from "rxjs";
import { AutocomleteComponent } from "../../autocomplete/autocomlete/autocomlete.component";
import { BaseFormComponent } from "../../form";
import { FeatureConfigService, ReceiptProcessingSettings, SystemSettings, SystemSettingsService } from "../../open-api";
import { InputReadonlyPipe } from "../../pipes/input-readonly.pipe";
import { SnackbarService } from "../../services";
import { SetFeatureConfig } from "../../store";
import { SetCurrencyData, SetCurrencyDisplay } from "../../store/system-settings.state.actions";


@UntilDestroy()
@Component({
  selector: "app-system-settings-form",
  templateUrl: "./system-settings-form.component.html",
  styleUrl: "./system-settings-form.component.scss",
  providers: [InputReadonlyPipe]
})
export class SystemSettingsFormComponent extends BaseFormComponent implements OnInit {
  @ViewChild("fallbackReceiptProcessingSettings")
  public fallbackReceiptProcessingSettings!: AutocomleteComponent;

  public originalSystemSettings!: SystemSettings;

  public allReceiptProcessingSettings: ReceiptProcessingSettings[] = [];

  public filteredReceiptProcessingSettings: ReceiptProcessingSettings[] = [];

  public supportedLocales: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private featureConfigService: FeatureConfigService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbarService: SnackbarService,
    private store: Store,
    private systemSettingsService: SystemSettingsService,
    private inputReadonlyPipe: InputReadonlyPipe
  ) {
    super();
  }

  public ngOnInit(): void {
    this.setFormConfigFromRoute(this.activatedRoute);
    this.allReceiptProcessingSettings = this.activatedRoute.snapshot.data?.["allReceiptProcessingSettings"];
    this.originalSystemSettings = this.activatedRoute.snapshot.data?.["systemSettings"];
    this.supportedLocales = this.activatedRoute.snapshot.data["locales"];
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      enableLocalSignUp: [this.originalSystemSettings?.enableLocalSignUp],
      debugOcr: [this.originalSystemSettings?.debugOcr],
      emailPollingInterval: [this.originalSystemSettings?.emailPollingInterval, [Validators.required, Validators.min(0)]],
      numWorkers: [this.originalSystemSettings?.numWorkers ?? 1, [Validators.required, Validators.min(1)]],
      currencyDisplay: [this.originalSystemSettings?.currencyDisplay],
      showCurrencySymbol: [this.originalSystemSettings?.showCurrencySymbol],
      currencyLocale: [this.originalSystemSettings?.currencyLocale],
      currencyCode: [this.originalSystemSettings?.currencyCode],
      receiptProcessingSettingsId: [this.originalSystemSettings?.receiptProcessingSettingsId],
      fallbackReceiptProcessingSettingsId: [this.originalSystemSettings?.fallbackReceiptProcessingSettingsId]
    });

    if (this.inputReadonlyPipe.transform(this.formConfig.mode)) {
      this.form.get("debugOcr")?.disable();
      this.form.get("enableLocalSignUp")?.disable();
    }

    this.listenForReceiptProcessingSettingsChanges();
  }

  private listenForReceiptProcessingSettingsChanges(): void {
    this.form.get("receiptProcessingSettingsId")?.valueChanges
      .pipe(
        startWith(this.form.get("receiptProcessingSettingsId")?.value),
        untilDestroyed(this),
        tap((value: number) => {
          this.filteredReceiptProcessingSettings = this.allReceiptProcessingSettings.filter((rps) => rps.id !== value);

          if (!value) {
            this.fallbackReceiptProcessingSettings.clearFilter();
          }
        })
      )
      .subscribe();
  }

  public displayWith(id: number): string {
    return this.allReceiptProcessingSettings.find((rps) => rps.id === id)?.name ?? "";
  }

  // TODO: Refactor to use a configurable separators instead of locales.
  public submit(): void {
    const formValue = this.form.value;
    formValue["emailPollingInterval"] = Number.parseInt(formValue["emailPollingInterval"]);
    formValue["numWorkers"] = Number.parseInt(formValue["numWorkers"]);

    this.systemSettingsService.updateSystemSettings(formValue)
      .pipe(
        take(1),
        tap(() => {
          this.snackbarService.success("System settings updated successfully");
          this.router.navigate(["/system-settings/settings/view"]);
        }),
        switchMap(() => this.featureConfigService.getFeatureConfig()),
        tap((featureConfig) => this.store.dispatch(new SetFeatureConfig(featureConfig))),
        switchMap(() => this.store.dispatch(new SetCurrencyDisplay(formValue["currencyDisplay"]?.toString()))),
        switchMap(() => this.store.dispatch(
          new SetCurrencyData(formValue["currencyLocale"],
            formValue["currencyCode"],
            formValue["showCurrencySymbol"],
          )))
      )
      .subscribe();
  }
}
