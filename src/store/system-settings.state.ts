import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, } from "@ngxs/store";
import { SetCurrencyData, SetCurrencyDisplay } from "./system-settings.state.actions";

export interface SystemSettingsStateInterface {
  currencyDisplay: string;
  currencySymbolPosition: string;
  currencyDecimalSeparator: string;
  currencyThousandthsSeparator: string;
}

@State<SystemSettingsStateInterface>({
  name: "systemSettings",
  defaults: {
    currencyDisplay: "$",
    currencyDecimalSeparator: "",
    currencyThousandthsSeparator: "",
    currencySymbolPosition: "",
  },
})
@Injectable()
export class SystemSettingsState {
  @Selector()
  static currencyDisplay(state: SystemSettingsStateInterface): string {
    return state.currencyDisplay;
  }

  @Selector()
  static currencyDecimalSeparator(state: SystemSettingsStateInterface): string {
    return state.currencyDecimalSeparator;
  }

  @Selector()
  static currencyThousandthsSeparator(state: SystemSettingsStateInterface): string {
    return state.currencyThousandthsSeparator;
  }

  @Selector()
  static currencySymbolPosition(state: SystemSettingsStateInterface): string {
    return state.currencySymbolPosition;
  }

  @Selector()
  static state(state: SystemSettingsStateInterface): SystemSettingsStateInterface {
    return state;
  }

  @Action(SetCurrencyDisplay)
  setCurrencyDisplay(
    { patchState }: StateContext<SystemSettingsStateInterface>,
    payload: SetCurrencyDisplay
  ) {
    patchState({
      currencyDisplay: payload.currencyDisplay,
    });
  }

  @Action(SetCurrencyData)
  setCurrencyData(
    { patchState }: StateContext<SystemSettingsStateInterface>,
    payload: SetCurrencyData
  ) {
    patchState({
      currencySymbolPosition: payload.currencySymbolPosition,
      currencyThousandthsSeparator: payload.currencyThousandthsSeparator,
      currencyDecimalSeparator: payload.currencyDecimalSeparator
    });
  }
}
