import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  public selectedDashboard?: Dashboard;

  constructor(
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.setDashboards();
  }

  private setDashboards(): void {
    this.dashboards =
      this.activatedRoute.parent?.snapshot?.data?.['dashboards'] || [];
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
