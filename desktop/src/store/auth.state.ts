import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

export interface AuthStateInterface {
  userId?: string;
  displayname?: string;
  username?: string;
  expirationDate?: Date;
}

@State<AuthStateInterface>({
  name: 'auth',
  defaults: {},
})
@Injectable()
export class AuthState {}
