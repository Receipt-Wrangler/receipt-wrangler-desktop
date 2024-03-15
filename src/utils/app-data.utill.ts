import { Store } from "@ngxs/store";
import { forkJoin, Observable } from "rxjs";
import { AppData } from "../api";
import { SetAuthState, SetFeatureConfig, SetGroups, SetUserPreferences, SetUsers } from "../store";

export function setAppData(store: Store, appData: AppData): Observable<any[]> {
  return forkJoin([
    store.dispatch(new SetAuthState(appData.claims)),
    store.dispatch(new SetFeatureConfig(appData.featureConfig)),
    store.dispatch(new SetGroups(appData.groups)),
    store.dispatch(new SetUserPreferences(appData.userPreferences)),
    store.dispatch(new SetUsers(appData.users)),
  ]);
}
