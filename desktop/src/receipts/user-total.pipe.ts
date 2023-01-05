import { Pipe, PipeTransform } from '@angular/core';
import { ItemData } from './item-list/item-list.component';

@Pipe({
  name: 'userTotal',
})
export class UserTotalPipe implements PipeTransform {
  public transform(
    userItemMap: Map<string, ItemData[]>,
    userId: string
  ): number {
    const items = userItemMap.get(userId) as ItemData[];
    if (items?.length === 0 || !items) {
      return 0;
    } else {
      return items.map((item) => item.item.amount).reduce((a, b) => a + b);
    }
  }
}
