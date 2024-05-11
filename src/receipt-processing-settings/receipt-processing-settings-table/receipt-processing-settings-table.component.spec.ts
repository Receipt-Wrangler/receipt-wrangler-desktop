import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgxsModule } from "@ngxs/store";
import { TableModule } from "../../table/table.module";

import { ReceiptProcessingSettingsTableComponent } from "./receipt-processing-settings-table.component";

describe("ReceiptProcessingSettingsTableComponent", () => {
  let component: ReceiptProcessingSettingsTableComponent;
  let fixture: ComponentFixture<ReceiptProcessingSettingsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceiptProcessingSettingsTableComponent],
      imports: [NgxsModule.forRoot(), HttpClientTestingModule, TableModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReceiptProcessingSettingsTableComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
