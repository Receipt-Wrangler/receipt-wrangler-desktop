import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable, of } from "rxjs";
import { map, take, delay } from "rxjs/operators";
import { AuthState, GroupState } from "../store";

@Injectable({
  providedIn: "root",
})
export class AuthGuard {
  constructor(private router: Router, private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const navigatingToAuth = route.url.toString().includes("auth");

    return this.store.select(AuthState.isLoggedIn).pipe(
      take(1),
      delay(10), // Small delay to ensure state consistency
      map((isLoggedIn) => {
        // if user tries to go to login screens while already logged in
        if (navigatingToAuth && isLoggedIn) {
          const dashboardLink = this.store.selectSnapshot(GroupState.dashboardLink);
          return this.router.createUrlTree([dashboardLink]);
        } else if (navigatingToAuth && !isLoggedIn) {
          return true;
        }

        if (!isLoggedIn) {
          return this.router.createUrlTree(["/auth/login"]);
        }

        return true;
      })
    );
  }
}
