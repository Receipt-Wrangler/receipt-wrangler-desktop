import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
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
        BaseChartDirective
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
});
