import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { User } from 'src/models/user';
import { SetUsers } from './user.state.actions';

export interface UserStateInterface {
  users: User[];
}

@State<UserStateInterface>({
  name: 'users',
  defaults: {
    users: [],
  },
})
@Injectable()
export class UserState {
  @Selector()
  static users(state: UserStateInterface): User[] {
    return state.users;
  }

  @Action(SetUsers)
  setUsers(
    { getState, patchState }: StateContext<UserStateInterface>,
    payload: SetUsers
  ) {
    patchState({
      users: payload.users,
    });
  }
}
