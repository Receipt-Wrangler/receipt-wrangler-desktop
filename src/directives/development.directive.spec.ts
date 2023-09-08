import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule } from '@ngxs/store';
import { ApiModule } from '@receipt-wrangler/receipt-wrangler-core';
import { developmentGuard } from 'src/guards/development.guard';

describe('developmentGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => developmentGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule, HttpClientTestingModule, NgxsModule.forRoot([])],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
