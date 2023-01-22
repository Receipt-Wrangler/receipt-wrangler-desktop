import { Injectable } from '@angular/core';
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import { Group } from 'src/models/group';
import { SetGroups } from './group.state.actions';

export interface GroupStateInterface {
  groups: Group[];
}

@State<GroupStateInterface>({
  name: 'groups',
  defaults: {
    groups: [],
  },
})
@Injectable()
export class GroupState {
  @Selector()
  static groups(state: GroupStateInterface): Group[] {
    return state.groups;
  }

  static getGroupById(groupId: string) {
    return createSelector([GroupState], (state: GroupStateInterface) => {
      return state.groups.find((g) => g.id.toString() === groupId.toString());
    });
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
