import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { GroupGuard } from './group.guard';

describe('GroupGuard', () => {
  let guard: GroupGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([]), RouterTestingModule],
    });
    guard = TestBed.inject(GroupGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
