import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GroupState } from 'src/store/group.state';
import { SetSelectedGroupId } from 'src/store/group.state.actions';

@Injectable({
  providedIn: 'root',
})
export class GroupGuard implements CanActivate {
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
      this.store.dispatch(new SetSelectedGroupId(newGroupId?.toString() ?? ''));
      this.router.navigate([`/receipts/group/${newGroupId}`]);
      return false;
    }
  }
}
