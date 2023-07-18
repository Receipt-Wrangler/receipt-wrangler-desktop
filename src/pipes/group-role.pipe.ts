import { Pipe, PipeTransform } from '@angular/core';
import { GroupMember } from 'src/api';
import { GroupUtil } from 'src/utils/group.utils';

@Pipe({
  name: 'groupRole',
})
export class GroupRolePipe implements PipeTransform {
  constructor(private groupUtil: GroupUtil) {}

  public transform(
    groupId: number | string | undefined,
    groupRole: GroupMember.GroupRoleEnum
  ): boolean {
    // if group id is just a number
    if (groupId === 'all') {
      return true;
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
