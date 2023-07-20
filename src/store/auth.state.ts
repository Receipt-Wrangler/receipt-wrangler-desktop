import { Injectable } from "@angular/core";
import { Action, createSelector, Selector, State, StateContext } from "@ngxs/store";
import { User } from "@noah231515/receipt-wrangler-core";

import { AuthStateInterface } from "../interfaces";
import { Logout, SetAuthState } from "./auth.state.actions";

@State<AuthStateInterface>({
  name: 'auth',
  defaults: {},
})
@Injectable()
export class AuthState {
  @Selector()
  static userRole(state: AuthStateInterface): string {
    return state.userRole ?? '';
  }

  @Selector()
  static isLoggedIn(state: AuthStateInterface): boolean {
    return !AuthState.isTokenExpired(state);
  }

  @Selector()
  static userId(state: AuthStateInterface): string {
    return state.userId ?? '';
  }

  @Selector()
  static isTokenExpired(state: AuthStateInterface): boolean {
    if (state.expirationDate) {
      return new Date() >= new Date(Number(state.expirationDate) * 1000);
    } else {
      return true;
    }
  }

  @Selector()
  static loggedInUser(state: AuthStateInterface): User {
    return {
      defaultAvatarColor: state.defaultAvatarColor ?? '',
      displayName: state.displayname ?? '',
      id: Number(state.userId) ?? '',
      username: state.username ?? '',
    } as User;
  }

  static hasRole(role: string) {
    return createSelector([AuthState], (state: AuthStateInterface) => {
      return state.userRole === role;
    });
  }

  @Action(SetAuthState)
  setAuthState(
    { getState, patchState }: StateContext<AuthStateInterface>,
    payload: SetAuthState
  ) {
    const claims = payload.userClaims as any;

    patchState({
      defaultAvatarColor: claims['DefaultAvatarColor'],
      displayname: claims['Displayname'],
      expirationDate: claims['exp']?.toString(),
      userId: claims['UserId']?.toString(),
      username: claims['Username'],
      userRole: claims['UserRole'],
    });
  }

  @Action(Logout)
  logout({ getState, patchState }: StateContext<AuthStateInterface>) {
    patchState({
      defaultAvatarColor: '',
      displayname: '',
      expirationDate: '',
      userId: '',
      username: '',
      userRole: undefined,
    });
  }
}
