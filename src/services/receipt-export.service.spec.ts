import { TestBed } from '@angular/core/testing';

import { ReceiptExportService } from './receipt-export.service';

describe('ReceiptExportService', () => {
  let service: ReceiptExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceiptExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
