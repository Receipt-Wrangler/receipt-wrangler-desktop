import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import { AutocompleteModule } from "../../autocomplete/autocomplete.module";
import { CheckboxModule } from "../../checkbox/checkbox.module";
import { InputModule } from "../../input/index";
import { CurrencySeparator, CurrencySymbolPosition, QueueName, SystemSettingsService } from "../../open-api";
import { PipesModule } from "../../pipes";
import { CustomCurrencyPipe } from "../../pipes/custom-currency.pipe";
import { SnackbarService } from "../../services";
import { SharedUiModule } from "../../shared-ui/shared-ui.module";
import { SystemSettingsState } from "../../store/system-settings.state";
import { AsynqQueueFormControlPipe } from "../pipes/asynq-queue-form-control.pipe";

import { SystemSettingsFormComponent } from "./system-settings-form.component";

describe("SystemSettingsFormComponent", () => {
  let component: SystemSettingsFormComponent;
  let fixture: ComponentFixture<SystemSettingsFormComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemSettingsFormComponent, CustomCurrencyPipe, AsynqQueueFormControlPipe],
      imports: [
        AutocompleteModule,
        CheckboxModule,
        HttpClientTestingModule,
        InputModule,
        NgxsModule.forRoot([SystemSettingsState]),
        PipesModule,
        ReactiveFormsModule,
        SharedUiModule,
        NoopAnimationsModule,
      ],
      providers: [
        CustomCurrencyPipe,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                allReceiptProcessingSettings: [],
                systemSettings: {},
                formConfig: {}
              }
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(SystemSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("init form with no data", () => {
    component.ngOnInit();

    expect(component.form.value).toEqual({
      enableLocalSignUp: null,
      debugOcr: null,
      currencyDisplay: null,
      emailPollingInterval: null,
      receiptProcessingSettingsId: null,
      fallbackReceiptProcessingSettingsId: null,
      currencyThousandthsSeparator: null,
      currencyDecimalSeparator: null,
      currencySymbolPosition: null,
      currencyHideDecimalPlaces: null,
      asynqConcurrency: null,
      asynqQueueConfigurations: []
    });
  });

  it("init form with data", () => {
    const activatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.snapshot.data["systemSettings"] = {
      enableLocalSignUp: true,
      debugOcr: true,
      currencyDisplay: "USD",
      emailPollingInterval: 5,
      receiptProcessingSettingsId: 1,
      fallbackReceiptProcessingSettingsId: 2,
      currencyThousandthsSeparator: CurrencySeparator.Comma,
      currencyDecimalSeparator: CurrencySeparator.Period,
      currencySymbolPosition: CurrencySymbolPosition.Start,
      currencyHideDecimalPlaces: true,
      asynqConcurrency: 12,
      asynqQueueConfigurations: [{
        name: QueueName.QuickScan,
        priority: 1,
      }]
    };

    component.ngOnInit();

    expect(component.form.getRawValue()).toEqual({
      enableLocalSignUp: true,
      debugOcr: true,
      currencyDisplay: "USD",
      emailPollingInterval: 5,
      receiptProcessingSettingsId: 1,
      fallbackReceiptProcessingSettingsId: 2,
      currencyThousandthsSeparator: CurrencySeparator.Comma,
      currencyDecimalSeparator: CurrencySeparator.Period,
      currencySymbolPosition: CurrencySymbolPosition.Start,
      currencyHideDecimalPlaces: true,
      asynqConcurrency: 12,
      asynqQueueConfigurations: [{
        name: QueueName.QuickScan,
        priority: 1,
      }]
    });
  });

  it("should submit form", () => {
    const systemSettingsService = TestBed.inject(SystemSettingsService);
    const snackbarService = TestBed.inject(SnackbarService);
    const router = TestBed.inject(Router);

    const updateSystemSettingsSpy = spyOn(systemSettingsService, "updateSystemSettings").and.returnValue(of(null as any));
    const snackbarServiceSpy = spyOn(snackbarService, "success");
    const routerSpy = spyOn(router, "navigate");

    component.originalSystemSettings.asynqQueueConfigurations = [{
      name: QueueName.QuickScan,
      priority: "1",
    } as any];

    component.form.setValue({
      enableLocalSignUp: true,
      debugOcr: true,
      currencyDisplay: "USD",
      emailPollingInterval: "5",
      receiptProcessingSettingsId: 1,
      fallbackReceiptProcessingSettingsId: 2,
      currencyThousandthsSeparator: CurrencySeparator.Comma,
      currencyDecimalSeparator: CurrencySeparator.Period,
      currencySymbolPosition: CurrencySymbolPosition.Start,
      currencyHideDecimalPlaces: false,
      asynqConcurrency: "12",
      asynqQueueConfigurations: []
    });

    (component.form.get("asynqQueueConfigurations") as FormArray).push(
      new FormGroup({
        name: new FormControl(QueueName.QuickScan),
        priority: new FormControl("1"),
      })
    );

    component.submit();

    expect(updateSystemSettingsSpy).toHaveBeenCalledWith({
      enableLocalSignUp: true,
      debugOcr: true,
      currencyDisplay: "USD",
      emailPollingInterval: 5,
      receiptProcessingSettingsId: 1,
      fallbackReceiptProcessingSettingsId: 2,
      currencyThousandthsSeparator: CurrencySeparator.Comma,
      currencyDecimalSeparator: CurrencySeparator.Period,
      currencySymbolPosition: CurrencySymbolPosition.Start,
      currencyHideDecimalPlaces: false,
      asynqConcurrency: 12,
      asynqQueueConfigurations: [
        {
          name: QueueName.QuickScan,
          priority: 1,
        }
      ]
    });

    expect(snackbarServiceSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  });
});
