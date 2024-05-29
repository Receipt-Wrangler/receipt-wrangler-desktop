import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxsModule } from "@ngxs/store";
import { of } from "rxjs";
import { SystemSettingsService } from "../../open-api";
import { PipesModule } from "../../pipes";
import { SnackbarService } from "../../services";
import { SharedUiModule } from "../../shared-ui/shared-ui.module";

import { SystemSettingsFormComponent } from "./system-settings-form.component";

describe("SystemSettingsFormComponent", () => {
  let component: SystemSettingsFormComponent;
  let fixture: ComponentFixture<SystemSettingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemSettingsFormComponent],
      imports: [
        SharedUiModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        PipesModule,
        NgxsModule.forRoot([])
      ],
      providers: [
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
      emailPollingInterval: null,
      receiptProcessingSettingsId: null,
      fallbackReceiptProcessingSettingsId: null
    });
  });

  it("init form with data", () => {
    const activatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.snapshot.data["systemSettings"] = {
      enableLocalSignUp: true,
      debugOcr: true,
      emailPollingInterval: 5,
      receiptProcessingSettingsId: 1,
      fallbackReceiptProcessingSettingsId: 2
    };

    component.ngOnInit();

    expect(component.form.value).toEqual({
      enableLocalSignUp: true,
      debugOcr: true,
      emailPollingInterval: 5,
      receiptProcessingSettingsId: 1,
      fallbackReceiptProcessingSettingsId: 2
    });
  });

  it("should submit form", () => {
    const systemSettingsService = TestBed.inject(SystemSettingsService);
    const snackbarService = TestBed.inject(SnackbarService);
    const router = TestBed.inject(Router);

    const updateSystemSettingsSpy = spyOn(systemSettingsService, "updateSystemSettings").and.returnValue(of(null as any));
    const snackbarServiceSpy = spyOn(snackbarService, "success");
    const routerSpy = spyOn(router, "navigate");

    component.form.setValue({
      enableLocalSignUp: true,
      debugOcr: true,
      emailPollingInterval: "5",
      receiptProcessingSettingsId: 1,
      fallbackReceiptProcessingSettingsId: 2
    });

    component.submit();

    expect(updateSystemSettingsSpy).toHaveBeenCalledWith({
      enableLocalSignUp: true,
      debugOcr: true,
      emailPollingInterval: 5,
      receiptProcessingSettingsId: 1,
      fallbackReceiptProcessingSettingsId: 2
    });

    expect(snackbarServiceSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  });
});
