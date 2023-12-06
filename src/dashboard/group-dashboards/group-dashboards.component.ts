import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import {
  Dashboard,
  GroupState,
  SetSelectedDashboardId,
} from '@receipt-wrangler/receipt-wrangler-core';
import { Observable, tap } from 'rxjs';
import { DEFAULT_DIALOG_CONFIG } from 'src/constants';
import { DashboardFormComponent } from '../dashboard-form/dashboard-form.component';
import { DashboardState } from 'src/store/dashboard.state';

@UntilDestroy()
@Component({
  selector: 'app-group-dashboards',
  templateUrl: './group-dashboards.component.html',
  styleUrls: ['./group-dashboards.component.scss'],
})
export class GroupDashboardsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private router: Router,
    private store: Store
  ) {}

  @Select(GroupState.selectedGroupId)
  public selectedGroupId!: Observable<string>;

  @Select(GroupState.selectedDashboardId)
  public selectedDashboardId!: Observable<string>;

  public dashboards: Dashboard[] = [];

  public ngOnInit(): void {
    this.checkForSelectedDashboard();
    this.setDashboards();
    this.listenForParamChanges();
  }

  private listenForParamChanges(): void {
    this.activatedRoute.params
      .pipe(
        tap(() => {
          this.setDashboards();
        })
      )
      .subscribe();
  }

  private checkForSelectedDashboard(): void {
    const selectedDashboardId = this.store.selectSnapshot(
      GroupState.selectedDashboardId
    );

    if (selectedDashboardId) {
      this.navigateToDashboard(+selectedDashboardId);
    }
  }

  private setDashboards(): void {
    const selectedGroupId = this.store.selectSnapshot(
      GroupState.selectedGroupId
    );
    this.store
      .select(DashboardState.getDashboardsByGroupId(selectedGroupId))
      .pipe(
        tap((dashboards) => (this.dashboards = dashboards)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  public navigateToDashboard(dashboardId: number): void {
    this.router.navigateByUrl(`/dashboard/group/1/${dashboardId}`, {
      skipLocationChange: false,
      onSameUrlNavigation: 'reload',
    });
  }

  public openDashboardDialog(isCreate?: boolean): void {
    const dialogRef = this.matDialog.open(
      DashboardFormComponent,
      DEFAULT_DIALOG_CONFIG
    );
    const selectedDashboardId = this.store.selectSnapshot(
      GroupState.selectedGroupId
    );

    if (!isCreate) {
      const dashboard = this.dashboards.find(
        (d) => d.id === +selectedDashboardId
      );

      dialogRef.componentInstance.dashboard = dashboard;
      dialogRef.componentInstance.headerText = `Edit Dashboard ${dashboard?.name}`;
    } else {
      dialogRef.componentInstance.headerText = 'Add a Dashboard';
    }

    dialogRef
      .afterClosed()
      .pipe(
        untilDestroyed(this),
        tap((dashboard) => {
          const index = this.dashboards.findIndex(
            (d) => d.id === dashboard?.id
          );
          // TODO: Create dashboards service to share dashboards
          if (dashboard && index < 0) {
            this.dashboards.push(dashboard);
          } else if (dashboard && index > -1) {
            const newArray = Array.from(this.dashboards);
            newArray[index] = dashboard;
            this.dashboards = newArray;
            //this.dashboards[index] = dashboard;
          }
        })
      )
      .subscribe();
  }

  public setSelectedDashboardId(dashboardId: number): void {
    this.store.dispatch(new SetSelectedDashboardId(dashboardId?.toString()));
  }
}
