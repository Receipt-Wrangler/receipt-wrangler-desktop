import { GroupMember } from './group-member';

export interface Group {
  id: number;
  name: string;
  isDefault: boolean;
  groupMembers: GroupMember[];
  status: string;
}
