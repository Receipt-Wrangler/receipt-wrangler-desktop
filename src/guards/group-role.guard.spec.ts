import { TestBed } from '@angular/core/testing';

import { GroupRoleGuard } from './group-role.guard';

describe('GroupRoleGuard', () => {
  let guard: GroupRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GroupRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
