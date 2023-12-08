import { Dashboard } from '@receipt-wrangler/receipt-wrangler-core';

export interface DashboardStateInterface {
  dashboards: { [groupId: string]: Dashboard[] };
}
