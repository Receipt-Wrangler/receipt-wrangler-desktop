import { TestBed } from '@angular/core/testing';

import { ReceiptQueueService } from './receipt-queue.service';

describe('ReceiptQueueService', () => {
  let service: ReceiptQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceiptQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
