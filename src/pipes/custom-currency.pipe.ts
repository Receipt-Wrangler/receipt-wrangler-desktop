import { CurrencyPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import { Store } from "@ngxs/store";
import { SystemSettingsState } from "../store/system-settings.state";

@Pipe({
  name: "customCurrency",
})
export class CustomCurrencyPipe implements PipeTransform {
  constructor(private store: Store, private currencyPipe: CurrencyPipe) {}

  public transform(currency: string | number): string {
    const currencyDisplay = this.store.selectSnapshot(SystemSettingsState.currencyDisplay);
    return this.currencyPipe.transform(currency, "", currencyDisplay) ?? "";
  }
}
