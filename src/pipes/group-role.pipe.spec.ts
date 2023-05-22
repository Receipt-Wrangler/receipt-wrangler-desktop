import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { GroupState } from 'src/store/group.state';
import { GroupUtil } from 'src/utils/group.utils';
import { GroupRolePipe } from './group-role.pipe';
import { GroupRole } from 'src/enums/group-role.enum';
import { AuthState } from 'src/store/auth.state';

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
    const result = pipe.transform(undefined, GroupRole.OWNER);

    expect(result).toEqual(true);
  });

  it('should return false if user does not have the right role, and the input is a number', () => {
    store.reset({
      auth: { userId: 1 },
      groups: {
        groups: [
          {
            id: 1,
            groupMembers: [{ userId: 1, groupRole: GroupRole.EDITOR }],
          },
        ],
      },
    });

    const result = pipe.transform(1, GroupRole.OWNER);

    expect(result).toEqual(false);
  });

  it('should return false if the groupId is not parsable', () => {
    store.reset({
      auth: { userId: 1 },
      groups: {
        groups: [
          {
            id: 1,
            groupMembers: [{ userId: 1, groupRole: GroupRole.EDITOR }],
          },
        ],
      },
    });

    const result = pipe.transform('not a number', GroupRole.OWNER);

    expect(result).toEqual(false);
  });
});
