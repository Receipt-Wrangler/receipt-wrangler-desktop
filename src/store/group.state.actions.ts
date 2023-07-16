import { Group } from 'src/api-new';

export class AddGroup {
  static readonly type = '[Group] Add Group';
  constructor(public group: Group) {}
}

export class RemoveGroup {
  static readonly type = '[Group] Remove Group';
  constructor(public groupId: string) {}
}

export class SetGroups {
  static readonly type = '[Group] Set Groups';
  constructor(public groups: Group[]) {}
}

export class UpdateGroup {
  static readonly type = '[Group] Update Group';
  constructor(public group: Group) {}
}

export class SetSelectedGroupId {
  static readonly type = '[Group] Set Selected Group Id';
  constructor(public groupId?: string) {}
}
