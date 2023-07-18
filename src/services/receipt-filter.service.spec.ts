import { TestBed } from '@angular/core/testing';

import { ReceiptFilterService } from './receipt-filter.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiModule } from 'src/api';
import { NgxsModule } from '@ngxs/store';

describe('ReceiptFilterService', () => {
  let service: ReceiptFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule, HttpClientTestingModule, NgxsModule.forRoot([])],
    });
    service = TestBed.inject(ReceiptFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
