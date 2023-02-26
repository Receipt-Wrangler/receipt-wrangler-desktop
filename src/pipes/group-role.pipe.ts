import { Pipe, PipeTransform } from '@angular/core';
import { GroupRole } from 'src/enums/group-role.enum';
import { GroupUtil } from 'src/utils/group.utils';

@Pipe({
  name: 'groupRole',
})
export class GroupRolePipe implements PipeTransform {
  constructor(private groupUtil: GroupUtil) {}

  public transform(groupId: number | undefined, groupRole: GroupRole): boolean {
    return this.groupUtil.hasGroupAccess(groupId, groupRole);
  }
}
