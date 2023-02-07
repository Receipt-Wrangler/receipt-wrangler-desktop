import { UserRole } from 'src/enums/user_role.enum';

export interface User {
  id: number;
  displayName: string;
  username: string;
  userRole: UserRole;
  createdAt: string;
  updatedAt: string;
}
