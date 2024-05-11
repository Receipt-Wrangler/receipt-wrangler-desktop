import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { NgxsModule } from "@ngxs/store";
import { TableModule } from "../../table/table.module";

import { ReceiptProcessingSettingsTableService } from "./receipt-processing-settings-table.service";

describe("ReceiptProcessingSettingsTableService", () => {
  let service: ReceiptProcessingSettingsTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsModule.forRoot(), TableModule],
    });
    service = TestBed.inject(ReceiptProcessingSettingsTableService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
