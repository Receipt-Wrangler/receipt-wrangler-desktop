import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { NgxsModule } from "@ngxs/store";
import { ApiModule } from "../open-api";
import { ReceiptFilterService } from "./receipt-filter.service";

describe("ReceiptFilterService", () => {
  let service: ReceiptFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule, HttpClientTestingModule, NgxsModule.forRoot([])],
    });
    service = TestBed.inject(ReceiptFilterService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
