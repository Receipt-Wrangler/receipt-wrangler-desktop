import { TestBed } from '@angular/core/testing';

import { GroupGuard } from './group.guard';

describe('GroupGuard', () => {
  let guard: GroupGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GroupGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
