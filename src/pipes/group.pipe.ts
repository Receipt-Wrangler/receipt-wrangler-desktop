import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { Group, GroupState } from '@noah231515/receipt-wrangler-core';

@Pipe({
  name: 'group',
})
export class GroupPipe implements PipeTransform {
  constructor(private store: Store) {}

  public transform(groupId: string): Group | undefined {
    return this.store.selectSnapshot(GroupState.getGroupById(groupId));
  }
}
