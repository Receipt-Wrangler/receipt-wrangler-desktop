import { TestBed } from '@angular/core/testing';

import { GroupMemberUserService } from './group-member-user.service';
import { StoreModule } from 'src/store/store.module';
import { NgxsModule, Store } from '@ngxs/store';
import { GroupState, UserState } from '@receipt-wrangler/receipt-wrangler-core';

describe('GroupMemberUserService', () => {
  let service: GroupMemberUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([GroupState, UserState])],
    });
    service = TestBed.inject(GroupMemberUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get correct users in group', () => {
    const store = TestBed.inject(Store);
    store.reset({
      users: {
        users: [
          {
            id: 1,
          },
          {
            id: 2,
          },
          {
            id: 3,
          },
        ],
      },
      groups: [
        {
          name: 'Group 1',
          id: 1,
          groupMembers: [
            {
              userId: 1,
              groupId: 1,
            },
            {
              userId: 2,
              groupId: 1,
            },
            {
              userId: 3,
              groupId: 1,
            },
          ],
        },
      ],
    });

    const users = service.getUsersInGroup('1');
    expect(users).toEqual([
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ] as any);
  });
});
