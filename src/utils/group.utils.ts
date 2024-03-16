import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { GroupRole } from "../api";
import { AuthState, GroupState } from "../store";

@Injectable({
  providedIn: "root",
})
export class GroupUtil {
  constructor(private store: Store) {}

  public hasGroupAccess(
    groupId: number | undefined,
    groupRole: GroupRole
  ): boolean {
    const roles = [GroupRole.Viewer, GroupRole.Editor, GroupRole.Owner];
    const requiredIndex = roles.findIndex((v) => v === groupRole) as number;

    if (!groupId) {
      return true;
    } else {
      let hasAccess = false;

      const userId = this.store.selectSnapshot(AuthState.userId);
      const group = this.store.selectSnapshot(
        GroupState.getGroupById(groupId.toString())
      );

      if (!group) {
        return hasAccess;
      }

      const member = group.groupMembers.find(
        (m) => m.userId.toString() === userId.toString()
      );

      if (!member) {
        return hasAccess;
      }

      const memberIndex = roles.findIndex((v) => v === member.groupRole);
      hasAccess = memberIndex >= requiredIndex;

      return hasAccess;
    }
  }
}
