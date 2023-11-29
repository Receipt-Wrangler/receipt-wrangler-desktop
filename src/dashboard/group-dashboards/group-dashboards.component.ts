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
    this.dashboards = this.activatedRoute?.snapshot?.data?.['dashboards'] || [];
  }

  public navigateToDashboard(dashboardId: number): void {
    this.router.navigateByUrl(`/dashboard/group/1/${dashboardId}`, {
      skipLocationChange: false,
      onSameUrlNavigation: 'reload',
    });
  }

  public openDashboardDialog(dashboard?: Dashboard): void {
    const dialogRef = this.matDialog.open(
      DashboardFormComponent,
      DEFAULT_DIALOG_CONFIG
    );

    dialogRef.componentInstance.headerText = dashboard
      ? `Edit Dashboard ${dashboard.name}`
      : 'Add a dashboard';

    dialogRef
      .afterClosed()
      .pipe(
        untilDestroyed(this),
        tap((dashboard) => {
          this.dashboards.push(dashboard);
        })
      )
      .subscribe();
  }

  public setSelectedDashboardId(dashboardId: number): void {
    this.store.dispatch(new SetSelectedDashboardId(dashboardId?.toString()));
  }
}
