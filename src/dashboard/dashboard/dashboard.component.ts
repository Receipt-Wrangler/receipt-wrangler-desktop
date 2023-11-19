import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { GroupState } from '@receipt-wrangler/receipt-wrangler-core';
import { Observable } from 'rxjs';
import { DEFAULT_DIALOG_CONFIG, DEFAULT_HOST_CLASS } from 'src/constants';
import { DashboardFormComponent } from '../dashboard-form/dashboard-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: DEFAULT_HOST_CLASS,
})
export class DashboardComponent {
  @Select(GroupState.selectedGroupId)
  public selectedGroupId!: Observable<string>;

  constructor(private matDialog: MatDialog) {}

  public openDashboardDialog(): void {
    const dialogRef = this.matDialog.open(
      DashboardFormComponent,
      DEFAULT_DIALOG_CONFIG
    );

    dialogRef.componentInstance.headerText = 'Add a dashboard';
  }
}
