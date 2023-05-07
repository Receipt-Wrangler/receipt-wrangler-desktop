import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { GroupState } from 'src/store/group.state';
import { SetSelectedGroupId } from 'src/store/group.state.actions';

@Injectable({
  providedIn: 'root',
})
export class GroupGuard  {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const groupId = route.params['groupId'];
    const group = this.store.selectSnapshot(GroupState.getGroupById(groupId));
    const newGroupId = this.store.selectSnapshot(GroupState.groups)[0]?.id;

    if (group) {
      return true;
    } else {
      const basePath = route.data['groupGuardBasePath'];
      this.store.dispatch(new SetSelectedGroupId(newGroupId?.toString() ?? ''));
      this.router.navigate([`${basePath}/${newGroupId}`]);
      return false;
    }
  }
}
