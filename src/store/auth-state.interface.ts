import { UserRole } from "../api";
import { UserPreferences } from "../api/model/userPreferences";

export interface AuthStateInterface {
  userId?: string;
  displayname?: string;
  username?: string;
  expirationDate?: string;
  userRole?: UserRole;
  defaultAvatarColor?: string;
  userPreferences?: UserPreferences;
}
