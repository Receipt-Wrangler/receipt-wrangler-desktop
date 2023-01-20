import { TestBed } from '@angular/core/testing';

import { ReceiptResolverService } from './receipt-resolver.service';

describe('ReceiptResolverService', () => {
  let service: ReceiptResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceiptResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
