import { TestBed } from '@angular/core/testing';

import { GroupMemberUserService } from './group-member-user.service';

describe('GroupMemberUserService', () => {
  let service: GroupMemberUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupMemberUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
