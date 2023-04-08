import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { take, switchMap, tap, Observable } from 'rxjs';
import { AuthService } from 'src/api/auth.service';
import { Group, User } from 'src/models';
import { SnackbarService } from 'src/services/snackbar.service';
import { AuthState } from 'src/store/auth.state';
import { Logout } from 'src/store/auth.state.actions';
import { GroupState } from 'src/store/group.state';
import { SetSelectedGroupId } from 'src/store/group.state.actions';
import { LayoutState } from 'src/store/layout.state';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  @Select(AuthState.loggedInUser) public loggedInUser!: Observable<User>;

  @Select(AuthState.isLoggedIn) public isLoggedIn!: Observable<boolean>;

  @Select(LayoutState.isSidebarOpen) public isSidebarOpen!: Observable<boolean>;

  @Select(GroupState.groups) public groups!: Observable<Group[]>;

  @Select(GroupState.selectedGroupId)
  public selectedGroupId!: Observable<string>;

  public addButtonExpanded: boolean | null = null;

  public groupClicked(groupId: number): void {
    this.store.dispatch(new SetSelectedGroupId(groupId.toString()));
    const dashboardLink = this.store.selectSnapshot(GroupState.dashboardLink);
    this.router.navigate([dashboardLink]);
  }

  public toggleAddButtonExpanded(): void {
    this.addButtonExpanded = !this.addButtonExpanded;
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
