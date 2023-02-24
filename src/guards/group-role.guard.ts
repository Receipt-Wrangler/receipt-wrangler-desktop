import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GroupRole } from 'src/enums/group-role.enum';
import { GroupState } from 'src/store/group.state';
import { GroupUtil } from 'src/utils/group.utils';

@Injectable({
  providedIn: 'root',
})
export class GroupRoleGuard implements CanActivate {
  constructor(private store: Store, private groupUtil: GroupUtil) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentGroupId = this.store.selectSnapshot(
      GroupState.selectedGroupId
    );
    const groupRole = route.data['groupRole'] as GroupRole;
    return this.groupUtil.hasGroupAccess(
      Number.parseInt(currentGroupId),
      groupRole
    );
  }
}
