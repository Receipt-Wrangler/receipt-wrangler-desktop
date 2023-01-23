import { Injectable } from '@angular/core';
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import { Group } from 'src/models/group';
import { SetGroups, SetSelectedGroupId } from './group.state.actions';

export interface GroupStateInterface {
  groups: Group[];
  selectedGroupId: string;
}

@State<GroupStateInterface>({
  name: 'groups',
  defaults: {
    groups: [],
    selectedGroupId: '',
  },
})
@Injectable()
export class GroupState {
  @Selector()
  static groups(state: GroupStateInterface): Group[] {
    return state.groups;
  }

  @Selector()
  static selectedGroupId(state: GroupStateInterface): string {
    return state.selectedGroupId;
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

  @Action(SetSelectedGroupId)
  setSelectedGroupId({
    getState,
    patchState,
  }: StateContext<GroupStateInterface>) {
    const groups = getState().groups;

    patchState({
      selectedGroupId: groups[0].id.toString() ?? '',
    });
  }
}
