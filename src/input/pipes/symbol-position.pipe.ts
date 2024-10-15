import { Pipe, PipeTransform } from "@angular/core";
import { Store } from "@ngxs/store";
import { CurrencySymbolPosition } from "../../open-api/index";
import { SystemSettingsState } from "../../store/system-settings.state";

@Pipe({
  name: "symbolPosition",
})
export class SymbolPositionPipe implements PipeTransform {
  constructor(private store: Store) {}

  public transform(position: "prefix" | "suffix"): boolean {
    const currencyPosition = this.store.selectSnapshot(SystemSettingsState.currencySymbolPosition);
    if (currencyPosition === CurrencySymbolPosition.Start && position === "prefix") {
      return true;
    }

    if (currencyPosition === CurrencySymbolPosition.End && position === "suffix") {
      return true;
    }

    return false;
  }

}
