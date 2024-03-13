import { Pipe, PipeTransform } from "@angular/core";
import { Store } from "@ngxs/store";
import { Group } from "../api";
import { GroupState } from "../store";

@Pipe({
  name: "group",
})
export class GroupPipe implements PipeTransform {
  constructor(private store: Store) {}

  public transform(groupId: string): Group | undefined {
    return this.store.selectSnapshot(GroupState.getGroupById(groupId));
  }
}
