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
import { ActivatedRoute, Router } from '@angular/router';

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

  public selectedDashboardId?: number;

  constructor(
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    console.warn('init');
    this.setDashboards();
    this.setSelectedDashboardId();
  }

  private setDashboards(): void {
    this.dashboards = this.activatedRoute?.snapshot?.data?.['dashboards'] || [];
  }

  private setSelectedDashboardId(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.warn(params);
    });
    this.activatedRoute.url.subscribe((url) => {
      console.warn(url.toString());
      console.warn(this.activatedRoute.snapshot.params, 'pa');
    });
    this.selectedDashboardId =
      this.activatedRoute?.snapshot?.params?.['dashboardId'];

    console.warn(this.activatedRoute.snapshot.params);
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

  public navigateToDashboard(dashboardId: number): void {
    console.warn('hit');
    this.router.navigateByUrl(`/dashboard/group/1/${dashboardId}`, {
      skipLocationChange: false,
      onSameUrlNavigation: 'reload',
    });
  }
}
