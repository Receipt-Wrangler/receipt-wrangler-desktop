import { Component, OnInit } from '@angular/core';
import { EventType, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { forkJoin, Observable, switchMap, take, tap } from 'rxjs';
import { AuthService } from 'src/api/auth.service';
import { GroupsService } from 'src/api/groups.service';
import { UsersService } from 'src/api/users.service';
import { Group } from 'src/models/group';
import { User } from 'src/models/user';
import { AuthState } from 'src/store/auth.state';
import { SetAuthState } from 'src/store/auth.state.actions';
import { SetGroups } from 'src/store/group.state.actions';
import { SetUsers } from 'src/store/user.state.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'receipt-wrangler';

  constructor(
    private store: Store,
    private authService: AuthService,
    private userService: UsersService,
    private groupsService: GroupsService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.listenForNavigationStart();
    this.store.dispatch(new SetAuthState());
    const hasToken = this.store.selectSnapshot(AuthState.token);

    if (hasToken) {
      this.authService
        .getNewRefreshToken()
        .pipe(
          take(1),
          switchMap(() => this.getAppData())
        )
        .subscribe();
    } else {
      this.getAppData().pipe(take(1)).subscribe();
    }
  }

  private getAppData(): Observable<[User[], Group[]]> {
    const usersCall = this.userService.getAllUsers().pipe(
      take(1),
      tap((users) => this.store.dispatch(new SetUsers(users)))
    );

    const groupsCall = this.groupsService.GetGroupsForUser().pipe(
      take(1),
      tap((groups) => {
        this.store.dispatch(new SetGroups(groups));
      })
    );

    return forkJoin(usersCall, groupsCall);
  }

  private listenForNavigationStart(): void {
    this.router.events.subscribe((e: any) => {
      if (e.type === EventType.NavigationStart) {
        const tokenExpired = this.store.selectSnapshot(
          AuthState.isTokenExpired
        );
        if (tokenExpired) {
          this.authService.getNewRefreshToken().pipe(take(1)).subscribe();
        }
      }
    });
  }
}
