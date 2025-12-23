import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsModule } from "@ngxs/store";
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from "ng2-charts";
import { SharedUiModule } from "../../shared-ui/shared-ui.module";
import { PieChartComponent } from "./pie-chart.component";

describe("PieChartComponent", () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieChartComponent],
      imports: [
        SharedUiModule,
        NgxsModule.forRoot([]),
        BaseChartDirective,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        NoopAnimationsModule
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideCharts(withDefaultRegisterables())
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PieChartComponent);
    component = fixture.componentInstance;
    component.widget = { name: "Test Pie Chart" } as any;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set loading to false when no groupId is provided", () => {
    expect(component.isLoading).toBe(false);
  });

  it("should have empty chart data initially", () => {
    expect(component.pieChartData.labels).toEqual([]);
    expect(component.pieChartData.datasets[0].data).toEqual([]);
  });

  it("should have category as default aggregation type", () => {
    expect(component.aggregationTypeControl.value).toBe("category");
  });

  it("should have two aggregation options", () => {
    expect(component.aggregationOptions.length).toBe(2);
    expect(component.aggregationOptions[0].value).toBe("category");
    expect(component.aggregationOptions[1].value).toBe("tag");
  });

  it("should initialize with saved aggregation type from widget config", () => {
    component.widget = {
      name: "Test",
      configuration: { aggregationType: "tag" }
    } as any;
    component.ngOnInit();
    expect(component.aggregationTypeControl.value).toBe("tag");
  });
});
