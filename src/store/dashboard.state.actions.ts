import { Dashboard } from '@receipt-wrangler/receipt-wrangler-core';

export class SetDashboardsForGroup {
  static readonly type = '[Dashboards] Set Dashboards For Group';

  constructor(public groupId: string) {}
}
