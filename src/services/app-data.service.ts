import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { catchError, defer, firstValueFrom, forkJoin, map, switchMap, } from "rxjs";
import { AppData, FeatureConfigService, UserService } from "../api";
import { AuthState, SetAuthState, SetFeatureConfig, SetGroups, SetUserPreferences, SetUsers } from "../store";
import { SnackbarService } from "./snackbar.service";

@Injectable({
  providedIn: "root",
})
export class AppDataService {
  constructor(
    private featureConfigService: FeatureConfigService,
    private snackbarService: SnackbarService,
    private store: Store,
    private userSerivce: UserService
  ) {}

  public initAppData(): Promise<boolean> {
    const isLoggedIn = this.store.selectSnapshot(AuthState.isLoggedIn);

    if (isLoggedIn) {
      return firstValueFrom(
        this.userSerivce.getAppData().pipe(
          switchMap((appData: AppData) => {
            return forkJoin([
              this.store.dispatch(new SetFeatureConfig(appData.featureConfig)),
              this.store.dispatch(new SetAuthState(appData.claims)),
              this.store.dispatch(new SetUsers(appData.users)),
              this.store.dispatch(new SetGroups(appData.groups)),
              this.store.dispatch(
                new SetUserPreferences(appData.userPreferences)
              ),
            ]);
          }),
          map(() => true),
          catchError(() => {
            this.snackbarService.error("Failed to load app data");
            return defer(() => Promise.resolve(false));
          })
        )
      );
    } else {
      return firstValueFrom(
        this.featureConfigService.getFeatureConfig().pipe(
          switchMap((config) =>
            this.store.dispatch(new SetFeatureConfig(config))
          ),
          map(() => true),
          catchError(() => {
            this.snackbarService.error("Failed to reach server");
            return defer(() => Promise.resolve(false));
          })
        )
      );
    }
  }
}

export function initAppDataService(appInitService: AppDataService) {
  return () => appInitService.initAppData();
}
