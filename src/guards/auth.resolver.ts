import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable, of, timer } from "rxjs";
import { delay, map, switchMap, take } from "rxjs/operators";
import { AuthState } from "../store";

@Injectable({
  providedIn: "root",
})
export class AuthResolver {
  constructor(private store: Store, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(AuthState.isLoggedIn).pipe(
      take(1),
      switchMap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(["/auth/login"]);
          return of(false);
        }
        
        // Add a small delay to ensure all state updates have propagated
        return timer(50).pipe(
          map(() => true)
        );
      })
    );
  }
}