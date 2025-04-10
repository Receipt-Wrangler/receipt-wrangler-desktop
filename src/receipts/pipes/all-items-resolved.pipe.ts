import { Pipe, PipeTransform } from "@angular/core";
import { ReceiptStatus } from "../../open-api/index";
import { ItemData } from "../share-list/share-list.component";

@Pipe({
  name: "allItemsResolved",
  standalone: false
})
export class AllItemsResolvedPipe implements PipeTransform {

  public transform(items: ItemData[]): boolean {
    if (!items || !Array.isArray(items)) {
      return false;
    }

    return items.every(data => data.item.status === ReceiptStatus.Resolved);
  }
}
