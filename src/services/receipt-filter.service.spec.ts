import { TestBed } from '@angular/core/testing';

import { ReceiptFilterService } from './receipt-filter.service';

describe('ReceiptFilterService', () => {
  let service: ReceiptFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceiptFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
