import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  catchError,
  finalize,
  forkJoin,
  Observable,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { AuthService } from 'src/api/auth.service';
import { GroupsService } from 'src/api/groups.service';
import { UsersService } from 'src/api/users.service';
import { Group } from 'src/models/group';
import { User } from 'src/models/user';
import { AuthState } from 'src/store/auth.state';
import { SetAuthState } from 'src/store/auth.state.actions';
import { SetGroups, SetSelectedGroupId } from 'src/store/group.state.actions';
import { SetUsers } from 'src/store/user.state.actions';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  constructor(
    private store: Store,
    private authService: AuthService,
    private userService: UsersService,
    private groupsService: GroupsService
  ) {}

  public initAppData(): Promise<boolean> {
    return new Promise((resolve) => {
      this.store.dispatch(new SetAuthState());
      const hasToken = this.store.selectSnapshot(AuthState.token);

      if (hasToken) {
        this.authService
          .getNewRefreshToken()
          .pipe(
            take(1),
            switchMap(() => this.getAppData()),
            finalize(() => resolve(true))
          )
          .subscribe();
      } else {
        this.getAppData()
          .pipe(
            take(1),
            finalize(() => resolve(true))
          )
          .subscribe();
      }
    });
  }

  public getAppData(): Observable<[User[], Group[]]> {
    const usersCall = this.userService.getAllUsers().pipe(
      take(1),
      tap((users) => this.store.dispatch(new SetUsers(users)))
    );

    const groupsCall = this.groupsService.GetGroupsForUser().pipe(
      take(1),
      tap((groups) => {
        this.store.dispatch(new SetGroups(groups));
        this.store.dispatch(new SetSelectedGroupId());
      })
    );

    return forkJoin(usersCall, groupsCall);
  }
}

export function initAppData(appInitService: AppInitService) {
  return () => appInitService.initAppData();
}
