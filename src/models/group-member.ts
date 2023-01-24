import { GroupRole } from 'src/enums/group-role.enum';

export interface GroupMember {
  userId: number;
  groupId: number;
  groupRole: GroupRole;
}
