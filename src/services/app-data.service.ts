import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  AppData,
  AuthState,
  FeatureConfigService,
  SetAuthState,
  SetFeatureConfig,
  SetGroups,
  SetUserPreferences,
  SetUsers,
  SnackbarService,
  UserService,
} from '@receipt-wrangler/receipt-wrangler-core';
import {
  catchError,
  defer,
  firstValueFrom,
  forkJoin,
  map,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
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
            this.snackbarService.error('Failed to load app data');
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
            this.snackbarService.error('Failed to reach server');
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
