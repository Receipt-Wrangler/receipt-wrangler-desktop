import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetAuthState } from './auth.state.actions';
import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';

export interface AuthStateInterface {
  userId?: string;
  displayname?: string;
  username?: string;
  expirationDate?: string;
  token?: string;
}

@State<AuthStateInterface>({
  name: 'auth',
  defaults: {},
})
@Injectable()
export class AuthState {
  @Selector()
  static isLoggedIn(state: AuthStateInterface): boolean {
    return !AuthState.isTokenExpired(state);
  }

  @Selector()
  static token(state: AuthStateInterface): string {
    return state.token ?? '';
  }

  @Selector()
  static isTokenExpired(state: AuthStateInterface): boolean {
    if (state.expirationDate) {
      return new Date() >= new Date(Number(state.expirationDate) * 1000);
    } else {
      return true;
    }
  }

  @Action(SetAuthState)
  setAuthState({ getState, patchState }: StateContext<AuthStateInterface>) {
    const jwt = Cookie.get('jwt');
    if (jwt) {
      const claims = jwtDecode(jwt) as any;
      if (claims) {
        patchState({
          userId: claims['UserId']?.toString(),
          displayname: claims['Displayname'],
          username: claims['Username'],
          expirationDate: claims['exp'],
          token: jwt,
        });
      }
    }
  }
}
