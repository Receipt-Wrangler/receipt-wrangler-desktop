import { TestBed } from '@angular/core/testing';

import { ReceiptsService } from './receipts.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule } from '@ngxs/store';

describe('ReceiptsService', () => {
  let service: ReceiptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsModule.forRoot([])],
    });
    service = TestBed.inject(ReceiptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
