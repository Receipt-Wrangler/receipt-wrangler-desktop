import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { dashboardResolver } from './dashboard.resolver';
import { Observable, of } from 'rxjs';
import {
  Dashboard,
  DashboardService,
} from '@receipt-wrangler/receipt-wrangler-core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('dashboardResolver', () => {
  const executeResolver: ResolveFn<Observable<Dashboard[]>> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() =>
      dashboardResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DashboardService],
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('should attempt to get dashboards by group id', () => {
    const serviceSpy = spyOn(
      TestBed.inject(DashboardService),
      'getDashboardsForUserByGroupId'
    ).and.returnValue(of([] as any));

    executeResolver(
      {
        params: {
          groupId: '1',
        },
      } as any,
      {} as any
    );

    expect(serviceSpy).toHaveBeenCalledWith('1');
  });
});
