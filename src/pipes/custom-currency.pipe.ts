import { CurrencyPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import { Store } from "@ngxs/store";
import { SystemSettingsState } from "../store/system-settings.state";

@Pipe({
  name: "customCurrency",
})
export class CustomCurrencyPipe implements PipeTransform {
  constructor(private store: Store, private currencyPipe: CurrencyPipe) {}

  public transform(value: string | number, currencyCode?: string, locale?: string, showCurrencySymbol?: boolean): string {
    const systemSettingsState = this.store.selectSnapshot(SystemSettingsState.state);
    //const currencyCodeToUse = currencyCode || systemSettingsState?.currencyCode;
    //const localeToUse = locale || systemSettingsState?.currencyLocale;
    //const showCurrencySymbolToUse = showCurrencySymbol || systemSettingsState?.showCurrencySymbol;

    return this.currencyPipe.transform(value) ?? "";
  }
}
