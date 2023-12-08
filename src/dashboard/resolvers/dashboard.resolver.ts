import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  Dashboard,
  DashboardService,
} from '@receipt-wrangler/receipt-wrangler-core';
import { Observable, take } from 'rxjs';
import { SetDashboardsForGroup } from 'src/store/dashboard.state.actions';

export const dashboardResolver: ResolveFn<Observable<Dashboard[]>> = (
  route,
  state
) => {
  const store = inject(Store);
  const groupId = route.params['groupId'];

  return store.dispatch(new SetDashboardsForGroup(groupId));
};
