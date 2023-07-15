import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { finalize, forkJoin, Observable, switchMap, take, tap } from 'rxjs';
import { AuthService, User, UserService } from 'src/api-new';
import { FeatureConfigService } from 'src/api/feature-config.service';
import { GroupsService } from 'src/api/groups.service';
import { GroupStatus } from 'src/enums/group-status.enum';
import { Group } from 'src/models/group';
import { SetFeatureConfig } from 'src/store/feature-config.state.actions';
import { GroupState } from 'src/store/group.state';
import { SetGroups, SetSelectedGroupId } from 'src/store/group.state.actions';
import { SetUsers } from 'src/store/user.state.actions';
import { ClaimsService } from './claims.service';

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
    private userService: UserService
  ) {}

  public initAppData(): Promise<boolean> {
    return new Promise((resolve) => {
      this.featureConfigService
        .GetFeatureConfig()
        .pipe(
          take(1),
          switchMap((config) =>
            this.store.dispatch(new SetFeatureConfig(config))
          ),
          switchMap(() => this.authService.getNewRefreshToken()),
          switchMap(() => this.getAppData()),
          finalize(() => resolve(true))
        )
        .subscribe();
    });
  }

  public getAppData(): Observable<[User[], Group[], void]> {
    const usersCall = this.userService.getUsers().pipe(
      take(1),
      tap((users) => this.store.dispatch(new SetUsers(users)))
    );

    const groupsCall = this.groupsService.GetGroupsForUser().pipe(
      take(1),
      tap((groups) => {
        groups.unshift({
          id: 'all' as any,
          name: 'All',
          isDefault: false,
          groupMembers: [],
          status: GroupStatus.ACTIVE,
        });
        this.store.dispatch(new SetGroups(groups));
        const groupId = this.store.selectSnapshot(GroupState.selectedGroupId);
        if (!groupId) {
          this.store.dispatch(new SetSelectedGroupId());
        }
      })
    );
    const userClaims = this.claimsService.getAndSetClaimsForLoggedInUser();

    return forkJoin(usersCall, groupsCall, userClaims);
  }
}

export function initAppData(appInitService: AppInitService) {
  return () => appInitService.initAppData();
}
