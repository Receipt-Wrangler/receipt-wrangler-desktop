import { GroupMember } from './group-member';

export interface Group {
  id: number;
  name: string;
  isDefaultGroup: boolean;
  groupMembers: GroupMember[];
}
