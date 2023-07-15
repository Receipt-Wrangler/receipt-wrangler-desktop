import { User } from 'src/api-new';

export interface AuthStateInterface {
  userId?: string;
  displayname?: string;
  username?: string;
  expirationDate?: string;
  userRole?: User.UserRoleEnum;
  defaultAvatarColor?: string;
}
