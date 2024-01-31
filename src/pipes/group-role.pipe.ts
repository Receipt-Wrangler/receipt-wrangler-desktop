import { GroupUtil } from "src/utils/group.utils";

import { Pipe, PipeTransform } from "@angular/core";
import { GroupRole } from "@receipt-wrangler/receipt-wrangler-core";

@Pipe({
  name: 'groupRole',
})
export class GroupRolePipe implements PipeTransform {
  constructor(private groupUtil: GroupUtil) {}

  public transform(
    groupId: number | string | undefined | null,
    groupRole: GroupRole,
    acceptAllGroup: boolean = true
  ): boolean {
    // if group id is just a number
    if (groupId === 'all') {
      return acceptAllGroup;
    }
    if (groupId) {
      const parsed = Number.parseInt(groupId.toString());
      if (parsed !== undefined && !Number.isNaN(parsed)) {
        return this.groupUtil.hasGroupAccess(parsed, groupRole);
      }
    } else {
      return true;
    }

    return false;
  }
}
