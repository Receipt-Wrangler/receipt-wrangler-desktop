import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { ApiModule } from '../open-api/api.module';
import { ClaimsService } from './claims.service';

describe('ClaimsService', () => {
  let service: ClaimsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule, HttpClientTestingModule, NgxsModule.forRoot([])],
    });
    service = TestBed.inject(ClaimsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
