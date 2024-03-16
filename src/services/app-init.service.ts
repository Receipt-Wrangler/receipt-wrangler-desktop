import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { catchError, Observable, of, switchMap, tap, } from "rxjs";
import { AppData, AuthService, UserService, } from "../open-api";
import { setAppData } from "../utils";

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

  public getAppData(): Observable<any[]> {
    return this.userService.getAppData().pipe(switchMap((appData: AppData) => setAppData(this.store, appData)));
  }

}

export function initAppData(appInitService: AppInitService) {
  return () => appInitService.initAppData();
}
