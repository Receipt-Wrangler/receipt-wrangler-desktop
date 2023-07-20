import { User } from "@noah231515/receipt-wrangler-core";

export interface AuthStateInterface {
  userId?: string;
  displayname?: string;
  username?: string;
  expirationDate?: string;
  userRole?: User.UserRoleEnum;
  defaultAvatarColor?: string;
}
