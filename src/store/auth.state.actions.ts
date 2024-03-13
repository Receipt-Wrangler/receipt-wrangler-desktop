import { Claims } from "../api";
import { UserPreferences } from "../api/model/userPreferences";

export class SetAuthState {
  static readonly type = '[Auth] Set Auth State';

  constructor(public userClaims: Claims) {}
}

export class SetUserPreferences {
  static readonly type = '[Auth] Set User PReferences';

  constructor(public userPreferences: UserPreferences) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
