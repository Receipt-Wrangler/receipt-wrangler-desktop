import { Injectable } from '@angular/core';
import { Action, State, StateContext, createSelector } from '@ngxs/store';
import { DashboardService } from '@receipt-wrangler/receipt-wrangler-core';
import { take, tap } from 'rxjs';
import { DashboardStateInterface } from 'src/interfaces/dashboard-state.interface';
import { SetDashboardsForGroup } from './dashboard.state.actions';

@State<DashboardStateInterface>({
  name: 'dashboards',
  defaults: {
    dashboards: {},
  },
})
@Injectable()
export class DashboardState {
  constructor(private dashboardService: DashboardService) {}

  static getDashboardsByGroupId(groupId: string) {
    return createSelector(
      [DashboardState],
      (state: DashboardStateInterface) => {
        return state.dashboards[groupId] || [];
      }
    );
  }

  @Action(SetDashboardsForGroup)
  async setReceiptFilterData(
    { patchState, getState }: StateContext<DashboardStateInterface>,
    payload: SetDashboardsForGroup
  ) {
    return this.dashboardService
      .getDashboardsForUserByGroupId(payload.groupId)
      .pipe(
        take(1),
        tap((dashboards) => {
          console.warn('just returned');
          const newDashboards = Object.assign({}, getState().dashboards);
          newDashboards[payload.groupId] = dashboards;
          patchState({ dashboards: newDashboards });
        })
      )
      .subscribe();
  }
}
