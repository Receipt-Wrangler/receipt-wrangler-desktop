import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Group } from 'src/models/group';
import { SetGroups } from './group.state.actions';

export interface GroupStateInterface {
  groups: Group[];
}

@State<GroupStateInterface>({
  name: 'users',
  defaults: {
    groups: [],
  },
})
@Injectable()
export class UserState {
  @Selector()
  static(state: GroupStateInterface): Group[] {
    return state.groups;
  }

  @Action(SetGroups)
  setGroups(
    { patchState }: StateContext<GroupStateInterface>,
    payload: SetGroups
  ) {
    patchState({
      groups: payload.groups,
    });
  }
}
