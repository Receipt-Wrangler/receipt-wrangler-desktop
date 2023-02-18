import { Injectable } from '@angular/core';
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import { Group } from 'src/models/group';
import { AddGroup, SetGroups, SetSelectedGroupId } from './group.state.actions';

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

  @Action(AddGroup)
  addGroup(
    { getState, patchState }: StateContext<GroupStateInterface>,
    payload: AddGroup
  ) {
    const groups = Array.from(getState().groups);
    groups.push(payload.group);

    patchState({
      groups: groups,
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
  setSelectedGroupId(
    { getState, patchState }: StateContext<GroupStateInterface>,
    payload: SetSelectedGroupId
  ) {
    let groupId = '';
    if (payload?.groupId) {
      groupId = payload.groupId;
    } else {
      const groups = getState().groups;
      groupId = groups[0].id.toString();
    }

    patchState({
      selectedGroupId: groupId,
    });
  }
}
