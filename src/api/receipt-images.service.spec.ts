import { TestBed } from '@angular/core/testing';

import { ReceiptImagesService } from './receipt-images.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ReceiptImagesService', () => {
  let service: ReceiptImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ReceiptImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
