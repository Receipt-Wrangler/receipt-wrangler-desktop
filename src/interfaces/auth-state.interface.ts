import { UserRole } from '../enums/user_role.enum';

export interface AuthStateInterface {
  userId?: string;
  displayname?: string;
  username?: string;
  expirationDate?: string;
  userRole?: UserRole;
  defaultAvatarColor?: string;
}
