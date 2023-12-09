import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  Dashboard,
  GroupState,
  SetSelectedDashboardId,
} from '@receipt-wrangler/receipt-wrangler-core';
import { DashboardState } from 'src/store/dashboard.state';

export const dashboardGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const selectedGroupId = store.selectSnapshot(GroupState.selectedGroupId);
  const dashboardId = route?.params?.['dashboardId'];
  const dashboards: Dashboard[] = store.selectSnapshot(
    DashboardState.getDashboardsByGroupId(selectedGroupId)
  );

  if (
    dashboards.find((dashboard) => dashboard?.id?.toString() === dashboardId)
  ) {
    store.dispatch(new SetSelectedDashboardId(dashboardId));
    return true;
  } else {
    const router = inject(Router);

    const groupBasePath = `/dashboard/group/${selectedGroupId}`;

    router.navigate([groupBasePath]);
    return false;
  }
};
