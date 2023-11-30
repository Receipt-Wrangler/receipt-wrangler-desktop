import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import {
  Dashboard,
  GroupState,
  Widget,
} from '@receipt-wrangler/receipt-wrangler-core';
import { Observable, tap } from 'rxjs';
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

  public selectedDashboard?: Dashboard;

  public WidgetType = Widget.WidgetTypeEnum;

  constructor(
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.setDashboards();
    this.listenForParamChanges();
  }

  private listenForParamChanges(): void {
    this.activatedRoute.params
      .pipe(
        tap(() => {
          this.setSelectedDashboard();
        })
      )
      .subscribe();
  }

  private setDashboards(): void {
    this.dashboards =
      this.activatedRoute.parent?.snapshot?.data?.['dashboards'] || [];
  }

  private setSelectedDashboard(): void {
    const selectedDashboardId = this.store.selectSnapshot(
      GroupState.selectedDashboardId
    );
    this.selectedDashboard = this.dashboards.find(
      (dashboard) => dashboard?.id?.toString() === selectedDashboardId
    );
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
