import { Store } from "@ngxs/store";
import { forkJoin, Observable, of } from "rxjs";
import { AppData } from "../open-api";
import {
  GroupState,
  SetAuthState,
  SetFeatureConfig,
  SetGroups,
  SetIcons,
  SetSelectedGroupId,
  SetUserPreferences,
  SetUsers,
} from "../store";
import { SetCurrencyData, SetCurrencyDisplay } from "../store/system-settings.state.actions";

export function setAppData(store: Store, appData: AppData): Observable<any[]> {
  let selectedGroupIdObservable = of(undefined);
  if (!store.selectSnapshot(GroupState.selectedGroupId)) {
    selectedGroupIdObservable = store.dispatch(
      new SetSelectedGroupId(appData.groups[0].id.toString())
    );
  }

  return forkJoin([
    store.dispatch(new SetAuthState(appData.claims)),
    store.dispatch(new SetFeatureConfig(appData.featureConfig)),
    store.dispatch(new SetGroups(appData.groups)),
    store.dispatch(new SetUserPreferences(appData.userPreferences)),
    store.dispatch(new SetUsers(appData.users)),
    store.dispatch(new SetCurrencyDisplay(appData.currencyDisplay)),
    store.dispatch(new SetCurrencyData(
      appData.currencyLocale,
      appData.currencyCode,
      appData.showCurrencySymbol
    )),
    store.dispatch(new SetIcons(appData.icons)),
    selectedGroupIdObservable,
  ]);
}
