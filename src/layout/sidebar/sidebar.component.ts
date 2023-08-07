import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import {
  AuthService,
  AuthState,
  Group,
  GroupState,
  Logout,
  SetSelectedGroupId,
  SnackbarService,
  User,
} from '@receipt-wrangler/receipt-wrangler-core';
import { Observable, map, switchMap, take, tap } from 'rxjs';
import { LayoutState } from 'src/store/layout.state';
import { SetPage } from 'src/store/receipt-table.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService,
    private store: Store
  ) {}

  @Select(AuthState.loggedInUser) public loggedInUser!: Observable<User>;

  @Select(AuthState.isLoggedIn) public isLoggedIn!: Observable<boolean>;

  @Select(LayoutState.isSidebarOpen) public isSidebarOpen!: Observable<boolean>;

  public groups!: Observable<Group[]>;

  @Select(GroupState.selectedGroupId)
  public selectedGroupId!: Observable<string>;

  public addButtonExpanded: boolean | null = null;

  public ngOnInit(): void {
    this.groups = this.store
      .select(GroupState.groups)
      .pipe(
        map((g) => g.filter((g) => g.status !== Group.StatusEnum.ARCHIVED))
      );
  }

  public groupClicked(groupId: number): void {
    this.store.dispatch(new SetSelectedGroupId(groupId.toString()));
    this.store.dispatch(new SetPage(1));
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
