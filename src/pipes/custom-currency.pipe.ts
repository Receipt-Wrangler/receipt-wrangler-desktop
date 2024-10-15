import { CurrencyPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import { Store } from "@ngxs/store";
import { CurrencySymbolPosition } from "../open-api/index";
import { SystemSettingsState } from "../store/system-settings.state";

@Pipe({
  name: "customCurrency",
})
export class CustomCurrencyPipe implements PipeTransform {
  // TODO: update preview, add unit tests for this
  constructor(private store: Store, private currencyPipe: CurrencyPipe) {}

  public transform(value: string | number, currencyCode?: string, locale?: string, showCurrencySymbol?: boolean): string {
    const systemSettingsState = this.store.selectSnapshot(SystemSettingsState.state);
    let currencyValue = this.currencyPipe.transform(value, "USD", "symbol", undefined, "en-US") ?? "";
    const currencyDecimalSeparator = systemSettingsState?.currencyDecimalSeparator ?? ".";

    if (currencyDecimalSeparator) {
      currencyValue = currencyValue.replace(".", currencyDecimalSeparator);
    }

    if (systemSettingsState.currencyThousandthsSeparator) {
      const decimalIndex = currencyValue.indexOf(currencyDecimalSeparator);
      if (decimalIndex === -1) {
        currencyValue = currencyValue.replace(",", systemSettingsState?.currencyThousandthsSeparator);
      } else {
        const currencyValues = currencyValue.split("");
        for (let i = decimalIndex + 1; i < currencyValue.length; i++) {
          if (currencyValues[i] === ",") {
            currencyValues[i] = systemSettingsState.currencyThousandthsSeparator;
          }
        }

        currencyValue = currencyValues.join("");
      }
    }

    if (systemSettingsState.currencyDisplay) {
      const currencySymbol = systemSettingsState.currencyDisplay || "$";
      const currencyPosition = systemSettingsState.currencySymbolPosition || "start";
      let currencyValues = currencyValue.split("");
      const index = currencyValues.findIndex((v => v === "$"));
      currencyValues.splice(index, 1);

      if (currencyPosition === CurrencySymbolPosition.Start) {
        currencyValues.unshift(currencySymbol);
      }

      if (currencyPosition === CurrencySymbolPosition.End) {
        currencyValues.push(currencySymbol);
      }

      currencyValue = currencyValues.join("");
    }

    return currencyValue;
  }
}
