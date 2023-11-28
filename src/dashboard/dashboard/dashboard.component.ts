import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import {
  Dashboard,
  DashboardService,
  GroupState,
} from '@receipt-wrangler/receipt-wrangler-core';
import { Observable, take, tap } from 'rxjs';
import { DEFAULT_DIALOG_CONFIG, DEFAULT_HOST_CLASS } from 'src/constants';
import { DashboardFormComponent } from '../dashboard-form/dashboard-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: DEFAULT_HOST_CLASS,
})
export class DashboardComponent implements OnInit {
  @Select(GroupState.selectedGroupId)
  public selectedGroupId!: Observable<string>;

  public dashboards: Dashboard[] = [];

  constructor(
    private matDialog: MatDialog,
    private dashboardService: DashboardService,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.getDashboards();
  }

  private getDashboards(): void {
    const selectedGroupId = this.store.selectSnapshot(
      GroupState.selectedGroupId
    );

    this.dashboardService
      .getDashboardsForUserByGroupId(selectedGroupId)
      .pipe(
        take(1),
        tap(() => {})
      )
      .subscribe();
  }

  public openDashboardDialog(dashboard?: Dashboard): void {
    const dialogRef = this.matDialog.open(
      DashboardFormComponent,
      DEFAULT_DIALOG_CONFIG
    );

    dialogRef.componentInstance.headerText = dashboard
      ? `Edit Dashboard ${dashboard.name}`
      : 'Add a dashboard';
  }
}
