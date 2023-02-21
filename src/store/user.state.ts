import { Injectable } from '@angular/core';
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import { User } from 'src/models/user';
import { AddUser, SetUsers, UpdateUser } from './user.state.actions';

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

  static getUserById(userId: string) {
    return createSelector([UserState], (state: UserStateInterface) => {
      return UserState.findUserById(userId, state.users);
    });
  }

  static findUserById(userId: string, users: User[]): User | undefined {
    return users.find((u) => u.id.toString() === userId.toString());
  }

  static findUserIndexById(userId: string, users: User[]): number {
    return users.findIndex((u) => u.id.toString() === userId);
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

  @Action(UpdateUser)
  updateUser(
    { getState, patchState }: StateContext<UserStateInterface>,
    payload: UpdateUser
  ) {
    const users = Array.from(getState().users);
    const index = UserState.findUserIndexById(payload.userId, users);
    if (index >= 0) {
      users.splice(index, 1, payload.user);
      patchState({
        users: users,
      });
    }
  }

  @Action(AddUser)
  addUser(
    { getState, patchState }: StateContext<UserStateInterface>,
    payload: AddUser
  ) {
    const users = Array.from(getState().users);
    users.push(payload.user);
    patchState({
      users: users,
    });
  }
}
