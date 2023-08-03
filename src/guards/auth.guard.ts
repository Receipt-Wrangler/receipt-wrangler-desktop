import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState, GroupState } from '@receipt-wrangler/receipt-wrangler-core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private store: Store) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLoggedIn = this.store.selectSnapshot(AuthState.isLoggedIn);
    const navigatingToAuth = route.url.toString().includes('auth');

    // if user tries to go to login screens while already logged in
    if (navigatingToAuth && isLoggedIn) {
      this.router.navigate([
        this.store.selectSnapshot(GroupState.dashboardLink),
      ]);
      return false;
    } else if (navigatingToAuth && !isLoggedIn) {
      return true;
    }

    if (!isLoggedIn) {
      this.router.navigate(['/auth/login']);
    }

    return isLoggedIn;
  }
}
