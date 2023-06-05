import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GroupRole } from 'src/enums/group-role.enum';
import { GroupState } from 'src/store/group.state';
import { GroupUtil } from 'src/utils/group.utils';

@Injectable({
  providedIn: 'root',
})
export class GroupRoleGuard  {
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
    const groupRole = route.data['groupRole'] as GroupRole;

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
