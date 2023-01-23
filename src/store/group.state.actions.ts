import { Group } from 'src/models/group';

export class SetGroups {
  static readonly type = '[Group] Set Groups';
  constructor(public groups: Group[]) {}
}

export class SetSelectedGroupId {
  static readonly type = '[Group] Set Selected Group Id';
  constructor() {}
}
