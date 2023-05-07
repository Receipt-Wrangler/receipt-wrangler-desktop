import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { map, Observable, of, switchMap, take, tap } from 'rxjs';
import { AuthService } from 'src/api/auth.service';
import { User } from 'src/models';
import { SnackbarService } from 'src/services/snackbar.service';
import { AuthState } from 'src/store/auth.state';
import { Logout } from 'src/store/auth.state.actions';
import { GroupState } from 'src/store/group.state';
import { DEFAULT_DIALOG_CONFIG } from '../../constants';
import { SwitchGroupDialogComponent } from '../switch-group-dialog/switch-group-dialog.component';
import { ToggleIsSidebarOpen } from 'src/store/layout.state.actions';

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

  constructor(
    private matDialog: MatDialog,
    private store: Store,
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
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
