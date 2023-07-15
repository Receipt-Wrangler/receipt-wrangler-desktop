import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, switchMap, take, tap } from 'rxjs';
import { AuthService, User } from 'src/api-new';
import { NotificationsService } from 'src/api/notifications.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { AuthState } from 'src/store/auth.state';
import { Logout } from 'src/store/auth.state.actions';
import { GroupState } from 'src/store/group.state';
import { ToggleIsSidebarOpen } from 'src/store/layout.state.actions';
import { DEFAULT_DIALOG_CONFIG } from '../../constants';
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

  public groupName = '';

  public notificationCount: number | undefined = undefined;

  constructor(
    private authService: AuthService,
    private matDialog: MatDialog,
    private notificationsService: NotificationsService,
    private router: Router,
    private snackbarService: SnackbarService,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.selectedGroupId
      .pipe(
        tap((groupId) => {
          this.receiptHeaderLink = [
            this.store.selectSnapshot(GroupState.receiptListLink),
          ];
          this.dashboardHeaderLink = [
            this.store.selectSnapshot(GroupState.dashboardLink),
          ];
          const newGroup = this.store.selectSnapshot(
            GroupState.getGroupById(groupId)
          );
          this.groupName = newGroup?.name as string;
        })
      )
      .subscribe();
    this.updateNotificationCount();
  }

  private updateNotificationCount(): void {
    this.notificationsService
      .getNotificationCountForUser()
      .pipe(
        take(1),
        tap((n) => {
          if (n > 0) {
            this.notificationCount = n;
          } else {
            this.notificationCount = undefined;
          }
        })
      )
      .subscribe();
  }

  public toggleSidebar(): void {
    this.store.dispatch(new ToggleIsSidebarOpen());
  }

  public openSwitchGroupDialog(): void {
    this.matDialog.open(SwitchGroupDialogComponent, DEFAULT_DIALOG_CONFIG);
  }

  public logout(): void {
    this.authService
      .logout()
      .pipe(
        take(1),
        switchMap(() => this.store.dispatch(new Logout())),
        switchMap(() => this.router.navigate(['/'])),
        tap(() => this.snackbarService.success('Successfully logged out'))
      )
      .subscribe();
  }
}
