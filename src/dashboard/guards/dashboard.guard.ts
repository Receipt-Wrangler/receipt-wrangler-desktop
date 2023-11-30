import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Dashboard, GroupState } from '@receipt-wrangler/receipt-wrangler-core';

export const dashboardGuard: CanActivateFn = (route, state) => {
  const dashboardId = route?.params?.['dashboardId'];
  const dashboards: Dashboard[] =
    route?.parent?.data?.['dashboards'] || route?.data?.['dashboards'] || [];

  if (
    dashboards.find((dashboard) => dashboard?.id?.toString() === dashboardId)
  ) {
    return true;
  } else {
    const store = inject(Store);
    const router = inject(Router);

    const selectedGroupId = store.selectSnapshot(GroupState.selectedGroupId);
    const groupBasePath = `/dashboard/group/${selectedGroupId}`;

    router.navigate([groupBasePath]);
    return false;
  }
};
