import { Dashboard } from '@receipt-wrangler/receipt-wrangler-core';

export class SetDashboardsForGroup {
  static readonly type = '[Dashboards] Set Dashboards For Group';

  constructor(public groupId: string) {}
}

export class AddDashboardToGroup {
  static readonly type = '[Dashboards] Add dashboard to group';

  constructor(public groupId: string, public dashboard: Dashboard) {}
}

export class UpdateDashBoardForGroup {
  static readonly type = '[Dashboards] Update dashboards for group';

  constructor(
    public groupId: string,
    public dashboardId: number,
    public dashboard: Dashboard
  ) {}
}
