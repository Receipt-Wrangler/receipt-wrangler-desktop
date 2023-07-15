import { TestBed } from '@angular/core/testing';

import { ClaimsService } from './claims.service';

describe('ClaimsService', () => {
  let service: ClaimsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaimsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
