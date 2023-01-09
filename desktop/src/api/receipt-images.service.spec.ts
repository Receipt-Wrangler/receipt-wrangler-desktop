import { TestBed } from '@angular/core/testing';

import { ReceiptImagesService } from './receipt-images.service';

describe('ReceiptImagesService', () => {
  let service: ReceiptImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceiptImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
