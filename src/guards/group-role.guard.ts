import { Observable } from 'rxjs';
import { GroupUtil } from 'src/utils';

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngxs/store';
import {
  GroupMember,
  GroupState,
} from '@receipt-wrangler/receipt-wrangler-core';

@Injectable({
  providedIn: 'root',
})
export class GroupRoleGuard {
  constructor(
    private store: Store,
    private groupUtil: GroupUtil,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let hasAccess = false;
    let groupId: number | undefined = undefined;
    const groupRole = route.data['groupRole'] as GroupMember.GroupRoleEnum;

    const useRouteId = route.data['useRouteGroupId'];
    if (useRouteId) {
      groupId = Number.parseInt(route.params['id']);
    } else {
      groupId = Number.parseInt(
        this.store.selectSnapshot(GroupState.selectedGroupId)
      );
    }

    hasAccess = this.groupUtil.hasGroupAccess(groupId, groupRole);

    if (!hasAccess) {
      this.router.navigate([
        this.store.selectSnapshot(GroupState.dashboardLink),
      ]);
    }

    return hasAccess;
  }
}
