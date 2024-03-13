import { Dashboard } from "../api";

export interface DashboardStateInterface {
  dashboards: { [groupId: string]: Dashboard[] };
}
