import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { map, Observable, of, tap } from 'rxjs';
import { User } from 'src/models';
import { AuthState } from 'src/store/auth.state';
import { GroupState } from 'src/store/group.state';
import { DEFAULT_DIALOG_CONFIG } from '../../../constants';
import { SwitchGroupDialogComponent } from '../switch-group-dialog/switch-group-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Select(AuthState.isLoggedIn) public isLoggedIn!: Observable<boolean>;

  @Select(GroupState.selectedGroupId)
  public selectedGroupId!: Observable<string>;

  @Select(AuthState.loggedInUser) public loggedInUser!: Observable<User>;

  public receiptHeaderLink: string[] = [''];

  public dashboardHeaderLink: string[] = [''];

  constructor(private matDialog: MatDialog) {}

  public ngOnInit(): void {
    this.selectedGroupId
      .pipe(
        tap((groupId) => {
          this.receiptHeaderLink = [`/receipts/group/${groupId}`];
          this.dashboardHeaderLink = [`/dashboard/group/${groupId}`];
        })
      )
      .subscribe();
  }

  public openSwitchGroupDialog(): void {
    this.matDialog.open(SwitchGroupDialogComponent, DEFAULT_DIALOG_CONFIG);
  }
}
