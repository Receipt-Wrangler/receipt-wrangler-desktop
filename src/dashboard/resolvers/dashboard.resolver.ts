import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import {
  Dashboard,
  DashboardService,
} from '@receipt-wrangler/receipt-wrangler-core';
import { Observable, take } from 'rxjs';

export const dashboardResolver: ResolveFn<Observable<Dashboard[]>> = (
  route,
  state
) => {
  const dashboardService = inject(DashboardService);
  const groupId = route.params['groupId'];

  return dashboardService.getDashboardsForUserByGroupId(groupId).pipe(take(1));
};
