import { AuthState } from '@receipt-wrangler/receipt-wrangler-core';
import { GroupState } from '@receipt-wrangler/receipt-wrangler-core';
import { GroupUtil } from 'src/utils/group.utils';

import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { GroupMember } from '@receipt-wrangler/receipt-wrangler-core';

import { GroupRolePipe } from './group-role.pipe';

describe('GroupRolePipe', () => {
  let store: Store;
  let pipe: GroupRolePipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupRolePipe],
      imports: [NgxsModule.forRoot([GroupState, AuthState])],
      providers: [GroupUtil, GroupRolePipe],
    }).compileComponents();

    pipe = TestBed.inject(GroupRolePipe);
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true if there is no groupId', () => {
    const result = pipe.transform(undefined, GroupMember.GroupRoleEnum.OWNER);

    expect(result).toEqual(true);
  });

  it('should return false if user does not have the right role, and the input is a number', () => {
    store.reset({
      auth: { userId: 1 },
      groups: {
        groups: [
          {
            id: 1,
            groupMembers: [
              { userId: 1, groupRole: GroupMember.GroupRoleEnum.EDITOR },
            ],
          },
        ],
      },
    });

    const result = pipe.transform(1, GroupMember.GroupRoleEnum.OWNER);

    expect(result).toEqual(false);
  });

  it('should return false if the groupId is not parsable', () => {
    store.reset({
      auth: { userId: 1 },
      groups: {
        groups: [
          {
            id: 1,
            groupMembers: [
              { userId: 1, groupRole: GroupMember.GroupRoleEnum.EDITOR },
            ],
          },
        ],
      },
    });

    const result = pipe.transform(
      'not a number',
      GroupMember.GroupRoleEnum.OWNER
    );

    expect(result).toEqual(false);
  });

  it('should return true if the groupId is all', () => {
    store.reset({
      auth: { userId: 1 },
      groups: {
        groups: [
          {
            id: 1,
            groupMembers: [
              { userId: 1, groupRole: GroupMember.GroupRoleEnum.EDITOR },
            ],
          },
        ],
      },
    });

    const result = pipe.transform('all', GroupMember.GroupRoleEnum.OWNER);

    expect(result).toEqual(true);
  });
});
