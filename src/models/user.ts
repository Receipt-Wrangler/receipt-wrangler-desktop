import { UserRole } from 'src/enums/user_role.enum';

export interface User {
  id: number;
  displayName: string;
  username: string;
  isDummyUser: boolean;
  defaultAvatarColor?: string;
  userRole: UserRole;
  createdAt: string;
  updatedAt: string;
}
