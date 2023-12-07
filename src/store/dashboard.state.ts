import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  State,
  StateContext,
  createSelector,
} from '@ngxs/store';
import {
  Dashboard,
  DashboardService,
} from '@receipt-wrangler/receipt-wrangler-core';
import { take, tap } from 'rxjs';
import { DashboardStateInterface } from 'src/interfaces/dashboard-state.interface';
import {
  AddDashboardToGroup,
  SetDashboardsForGroup,
  UpdateDashBoardForGroup,
} from './dashboard.state.actions';

@State<DashboardStateInterface>({
  name: 'dashboards',
  defaults: {
    dashboards: {},
  },
})
@Injectable()
export class DashboardState {
  constructor(private dashboardService: DashboardService) {}
  @Selector()
  static dashboards(state: DashboardStateInterface): {
    [groupId: string]: Dashboard[];
  } {
    return state.dashboards;
  }

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
          const newDashboards = Object.assign({}, getState().dashboards);
          newDashboards[payload.groupId] = dashboards;
          patchState({ dashboards: newDashboards });
        })
      )
      .subscribe();
  }

  @Action(AddDashboardToGroup)
  addDashboardToGroup(
    { patchState, getState }: StateContext<DashboardStateInterface>,
    payload: AddDashboardToGroup
  ) {
    const newDashboards = Object.assign({}, getState().dashboards);
    newDashboards[payload.groupId] = [
      ...newDashboards[payload.groupId],
      payload.dashboard,
    ];
    patchState({ dashboards: newDashboards });
  }

  @Action(UpdateDashBoardForGroup)
  updateDashBoardForGroup(
    { patchState, getState }: StateContext<DashboardStateInterface>,
    payload: UpdateDashBoardForGroup
  ) {
    const newDashboards = Object.assign({}, getState().dashboards);
    const dashboardIndex = newDashboards[payload.groupId].findIndex(
      (dashboard) => {
        return dashboard.id === payload.dashboardId;
      }
    );

    if (dashboardIndex >= 0) {
      newDashboards[payload.groupId][dashboardIndex] = payload.dashboard;
      patchState({ dashboards: newDashboards });
    }
  }
}
