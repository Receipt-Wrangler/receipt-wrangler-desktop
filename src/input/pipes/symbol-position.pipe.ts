import { Pipe, PipeTransform } from "@angular/core";
import { Store } from "@ngxs/store";
import { SystemSettingsState } from "../../store/system-settings.state";

@Pipe({
  name: "symbolPosition",
})
export class SymbolPositionPipe implements PipeTransform {
  constructor(private store: Store) {}

  public transform(position: "prefix" | "suffix"): boolean {
    const currencyPosition = this.store.selectSnapshot(SystemSettingsState.currencySymbolPosition);
    if (currencyPosition === "start" && position === "prefix") {
      return true;
    }

    if (currencyPosition === "end" && position === "suffix") {
      return true;
    }

    return false;
  }

}
