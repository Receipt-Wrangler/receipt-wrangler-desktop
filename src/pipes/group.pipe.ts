import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { Group } from 'src/api';
import { GroupState } from 'src/store/group.state';

@Pipe({
  name: 'group',
})
export class GroupPipe implements PipeTransform {
  constructor(private store: Store) {}

  public transform(groupId: string): Group | undefined {
    return this.store.selectSnapshot(GroupState.getGroupById(groupId));
  }
}
