import { TestBed } from '@angular/core/testing';

import { ReceiptProcessingSettingsTableService } from './receipt-processing-settings-table.service';

describe('ReceiptProcessingSettingsTableService', () => {
  let service: ReceiptProcessingSettingsTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceiptProcessingSettingsTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
