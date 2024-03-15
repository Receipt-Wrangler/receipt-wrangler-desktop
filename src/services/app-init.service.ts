import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { catchError, forkJoin, Observable, of, switchMap, tap, } from "rxjs";
import { AppData, AuthService, UserService, } from "../api";
import { SetAuthState, SetFeatureConfig, SetGroups, SetUserPreferences, SetUsers } from "../store";

@Injectable({
  providedIn: "root",
})
export class AppInitService {
  constructor(
    private authService: AuthService,
    private store: Store,
    private userService: UserService,
  ) {}

  public initAppData(): Promise<boolean> {

    return new Promise((resolve) => {
      this.authService.getNewRefreshToken().pipe(
        switchMap(() => this.getAppData()),
        tap(() => resolve(true)),
        catchError((err) => {
          resolve(false);
          return of(err);
        })
      )
        .subscribe();
    });
  }

  public getAppData(): Observable<AppData> {
    return this.userService.getAppData().pipe(switchMap((appData: AppData) => this.setAppData(appData)));
  }

  private setAppData(appData: AppData): Observable<any> {
    return forkJoin([
      this.store.dispatch(new SetAuthState(appData.claims)),
      this.store.dispatch(new SetFeatureConfig(appData.featureConfig)),
      this.store.dispatch(new SetGroups(appData.groups)),
      this.store.dispatch(new SetUserPreferences(appData.userPreferences)),
      this.store.dispatch(new SetUsers(appData.users)),
    ]);
  }
}

export function initAppData(appInitService: AppInitService) {
  return () => appInitService.initAppData();
}
