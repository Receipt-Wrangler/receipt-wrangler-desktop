import { CurrencyPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import { Store } from "@ngxs/store";
import { CurrencySeparator, CurrencySymbolPosition } from "../open-api/index";
import { SystemSettingsState } from "../store/system-settings.state";

@Pipe({
  name: "customCurrency",
})
export class CustomCurrencyPipe implements PipeTransform {
  constructor(private store: Store, private currencyPipe: CurrencyPipe) {}

  public transform(
    value: string | number,
    currencySymbol?: string,
    currencyDecimalSeparator?: CurrencySeparator,
    currencyThousandthsSeparator?: CurrencySeparator,
    currencySymbolPosition?: CurrencySymbolPosition
  ): string {
    const systemSettingsState = this.store.selectSnapshot(SystemSettingsState.state);
    let currencyValue = this.currencyPipe.transform(value, "USD", "symbol", undefined, "en-US") ?? "";

    const currencySymbolToUse = currencySymbol || systemSettingsState.currencyDisplay;
    const currencyDecimalSeparatorToUse = currencyDecimalSeparator || systemSettingsState?.currencyDecimalSeparator;
    const currencyThousandthsSeparatorToUse = currencyThousandthsSeparator || systemSettingsState.currencyThousandthsSeparator;
    const currencySymbolPositionToUse = currencySymbolPosition || systemSettingsState.currencySymbolPosition;

    if (currencyDecimalSeparatorToUse) {
      currencyValue = currencyValue.replace(".", currencyDecimalSeparatorToUse);
    }

    if (currencyThousandthsSeparatorToUse) {
      const decimalIndex = currencyValue.indexOf(currencyDecimalSeparatorToUse);
      if (decimalIndex === -1) {
        currencyValue = currencyValue.replace(",", currencyThousandthsSeparatorToUse);
      } else {
        const currencyValues = currencyValue.split("");
        for (let i = decimalIndex + 1; i < currencyValue.length; i++) {
          if (currencyValues[i] === ",") {
            currencyValues[i] = currencyThousandthsSeparatorToUse;
          }
        }

        currencyValue = currencyValues.join("");
      }
    }

    if (currencySymbolToUse) {
      let currencyValues = currencyValue.split("");
      const index = currencyValues.findIndex((v => v === "$"));
      currencyValues.splice(index, 1);

      if (currencySymbolPositionToUse === CurrencySymbolPosition.Start) {
        currencyValues.unshift(currencySymbolToUse);
      }

      if (currencySymbolPositionToUse === CurrencySymbolPosition.End) {
        currencyValues.push(currencySymbolToUse);
      }

      currencyValue = currencyValues.join("");
    }

    return currencyValue;
  }
}
