import { Injectable } from '@angular/core';
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
import {
  AuthService,
  FeatureConfigService,
  Group,
  GroupsService,
  User,
  UserPreferences,
  UserPreferencesService,
  UserService,
} from '../api';
import { SetFeatureConfig } from '../store/feature-config.state.actions';
import { GroupState } from '../store/group.state';
import { SetGroups, SetSelectedGroupId } from '../store/group.state.actions';
import { SetUsers } from '../store/user.state.actions';

import { ClaimsService } from './claims.service';
import { SetUserPreferences } from '../store';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  constructor(
    private authService: AuthService,
    private claimsService: ClaimsService,
    private featureConfigService: FeatureConfigService,
    private groupsService: GroupsService,
    private store: Store,
    private userService: UserService,
    private userPreferencesService: UserPreferencesService
  ) {}

  public initAppData(): Promise<boolean> {
    return new Promise((resolve) => {
      this.featureConfigService
        .getFeatureConfig()
        .pipe(
          take(1),
          switchMap((config) =>
            this.store.dispatch(new SetFeatureConfig(config))
          ),
          catchError((err) => {
            resolve(false);
            return err;
          }),
          switchMap(() => this.authService.getNewRefreshToken()),
          switchMap(() => this.getAppData()),
          tap(() => resolve(true))
        )
        .subscribe();
    });
  }

  public getAppData(): Observable<[User[], Group[], void, UserPreferences]> {
    const usersCall = this.userService.getUsers().pipe(
      take(1),
      tap((users) => this.store.dispatch(new SetUsers(users)))
    );

    const groupsCall = this.groupsService.getGroupsForuser().pipe(
      take(1),
      tap((groups) => {
        this.store.dispatch(new SetGroups(groups));
        const groupId = this.store.selectSnapshot(GroupState.selectedGroupId);
        if (!groupId) {
          this.store.dispatch(new SetSelectedGroupId());
        }
      })
    );
    const userClaims = this.claimsService.getAndSetClaimsForLoggedInUser();
    const userPreferencesCall = this.userPreferencesService
      .getUserPreferences()
      .pipe(
        take(1),
        tap((userPreferences) => {
          this.store.dispatch(new SetUserPreferences(userPreferences));
        })
      );

    return forkJoin(usersCall, groupsCall, userClaims, userPreferencesCall);
  }
}

export function initAppData(appInitService: AppInitService) {
  return () => appInitService.initAppData();
}
