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
import { FeatureConfigService } from 'src/api/feature-config.service';
import { GroupsService } from 'src/api/groups.service';
import { UsersService } from 'src/api/users.service';
import { Group } from 'src/models/group';
import { User } from 'src/models/user';
import { AuthState } from 'src/store/auth.state';
import { SetAuthState } from 'src/store/auth.state.actions';
import { SetFeatureConfig } from 'src/store/feature-config.state.actions';
import { GroupState } from 'src/store/group.state';
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
    private groupsService: GroupsService,
    private featureConfigService: FeatureConfigService
  ) {}

  public initAppData(): Promise<boolean> {
    return new Promise((resolve) => {
      this.store
        .dispatch(new SetAuthState())
        .pipe(
          take(1),
          tap(() => {
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
          })
        )
        .subscribe();
    });
  }

  public getAppData(): Observable<[User[], Group[], any]> {
    const usersCall = this.userService.getAllUsers().pipe(
      take(1),
      tap((users) => this.store.dispatch(new SetUsers(users)))
    );

    const groupsCall = this.groupsService.GetGroupsForUser().pipe(
      take(1),
      tap((groups) => {
        this.store.dispatch(new SetGroups(groups));
        const groupId = this.store.selectSnapshot(GroupState.selectedGroupId);
        if (!groupId) {
          this.store.dispatch(new SetSelectedGroupId());
        }
      })
    );

    const featureConfigCall = this.featureConfigService.GetFeatureConfig().pipe(
      take(1),
      switchMap((config) => this.store.dispatch(new SetFeatureConfig(config)))
    );

    return forkJoin(usersCall, groupsCall, featureConfigCall);
  }
}

export function initAppData(appInitService: AppInitService) {
  return () => appInitService.initAppData();
}
