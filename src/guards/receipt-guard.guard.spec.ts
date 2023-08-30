import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { receiptGuardGuard } from './receipt-guard.guard';

describe('receiptGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => receiptGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
