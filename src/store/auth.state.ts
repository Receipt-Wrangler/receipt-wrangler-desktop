import { Injectable } from '@angular/core';
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import { Logout, SetAuthState } from './auth.state.actions';
import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { User } from 'src/models';
import { UserRole } from 'src/enums/user_role.enum';

export interface AuthStateInterface {
  userId?: string;
  displayname?: string;
  username?: string;
  expirationDate?: string;
  userRole?: UserRole;
  token?: string;
}

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
  static token(state: AuthStateInterface): string {
    return state.token ?? '';
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
      id: Number(state.userId) ?? '',
      displayName: state.displayname ?? '',
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
      userId: claims['UserId']?.toString(),
      displayname: claims['Displayname'],
      username: claims['Username'],
      expirationDate: claims['exp']?.toString(),
      userRole: claims['UserRole'],
      token: '',
    });
  }

  @Action(Logout)
  logout({ getState, patchState }: StateContext<AuthStateInterface>) {
    patchState({
      userId: '',
      displayname: '',
      username: '',
      expirationDate: '',
      userRole: undefined,
      token: '',
    });
  }
}
