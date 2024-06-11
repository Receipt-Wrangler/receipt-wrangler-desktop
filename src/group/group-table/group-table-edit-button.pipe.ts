import { Pipe, PipeTransform } from "@angular/core";
import { Store } from "@ngxs/store";
import { Group } from "../../open-api";
import { AuthState } from "../../store";

@Pipe({
  name: "groupTableEditButton"
})
export class GroupTableEditButtonPipe implements PipeTransform {

  constructor(private store: Store) {}

  public transform(group: Group, isAdmin: boolean): {
    routerLink: string[]
    queryParams: any
  } {
    const loggedInUserId = this.store.selectSnapshot(AuthState.userId);
    const isInGroup = group.groupMembers.find(
      member => member.userId.toString()
        === loggedInUserId.toString());

    if (isAdmin && isInGroup) {
      return {
        routerLink: [`/groups/${group.id}/details/edit`],
        queryParams: { tab: "details" }
      };
    } else {
      return {
        routerLink: [`/groups/${group.id}/settings/edit`],
        queryParams: { tab: "settings" }
      };
    }
  }
}
