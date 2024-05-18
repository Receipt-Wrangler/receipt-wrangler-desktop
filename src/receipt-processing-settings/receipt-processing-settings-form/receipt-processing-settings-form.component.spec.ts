import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import { NgxsModule } from "@ngxs/store";
import { AiType, OcrEngine, ReceiptProcessingSettings } from "../../open-api";
import { PipesModule } from "../../pipes";
import { TABLE_SERVICE_INJECTION_TOKEN } from "../../services/injection-tokens/table-service";
import { ReceiptProcessingSettingsTaskTableService } from "../../services/receipt-processing-settings-task-table.service";
import { SharedUiModule } from "../../shared-ui/shared-ui.module";
import { ReceiptProcessingSettingsTaskTableState } from "../../store/receipt-processing-settings-task-table.state";

import { ReceiptProcessingSettingsFormComponent } from "./receipt-processing-settings-form.component";

describe("ReceiptProcessingSettingsFormComponent", () => {
  let component: ReceiptProcessingSettingsFormComponent;
  let fixture: ComponentFixture<ReceiptProcessingSettingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceiptProcessingSettingsFormComponent],
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([ReceiptProcessingSettingsTaskTableState]),
        NoopAnimationsModule,
        PipesModule,
        ReactiveFormsModule,
        SharedUiModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                prompts: [],
                receiptProcessingSettings: {},
                formConfig: {},
              }
            }
          }
        },
        {
          provide: TABLE_SERVICE_INJECTION_TOKEN,
          useClass: ReceiptProcessingSettingsTaskTableService
        }

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReceiptProcessingSettingsFormComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should init form with no data", () => {
    component.ngOnInit();

    expect(component.form.value).toEqual({
      name: null,
      description: null,
      numWorkers: 1,
      ocrEngine: null,
      aiType: null,
      promptId: null,
      key: null,
      url: null,
      model: null,
    });
  });

  it("should init form with data", () => {
    const activatedRoute = TestBed.inject(ActivatedRoute);
    const settings = {
      name: "name",
      description: "description",
      numWorkers: 10,
      ocrEngine: OcrEngine.EasyOcr,
      aiType: AiType.OpenAi,
      key: "key",
      promptId: 1,
    } as ReceiptProcessingSettings;

    activatedRoute.snapshot.data["receiptProcessingSettings"] = settings;
    component.ngOnInit();

    expect(component.form.value).toEqual({
      name: settings.name,
      description: settings.description,
      numWorkers: settings.numWorkers,
      ocrEngine: settings.ocrEngine,
      aiType: settings.aiType,
      promptId: settings.promptId,
      key: settings.key,
      url: null,
      model: null,
    });
  });
});
