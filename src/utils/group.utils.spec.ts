import { TestBed } from '@angular/core/testing';
import { Store, NgxsModule } from '@ngxs/store';
import { GroupRole } from 'src/enums/group-role.enum';
import { AuthState } from 'src/store/auth.state';
import { GroupState } from 'src/store/group.state';
import { GroupUtil } from './group.utils';

describe('GroupUtil', () => {
  let groupUtil: GroupUtil;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([AuthState, GroupState])],
      providers: [GroupUtil],
    });

    groupUtil = TestBed.inject(GroupUtil);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(groupUtil).toBeTruthy();
  });

  describe('hasGroupAccess', () => {
    const testGroupId = 1;
    const testGroupRole = GroupRole.EDITOR;

    it('should return true when groupId is undefined', () => {
      const result = groupUtil.hasGroupAccess(undefined, testGroupRole);
      expect(result).toBeTrue();
    });

    it('should return false when group is not found in store', () => {
      const result = groupUtil.hasGroupAccess(testGroupId, testGroupRole);
      expect(result).toBeFalse();
    });

    it('should return false when user is not a member of group', () => {
      const userId = '2';
      store.reset({
        auth: { userId: userId },
        groups: {
          groups: [
            {
              id: testGroupId,
              groupMembers: [{ userId: '3', groupRole: GroupRole.EDITOR }],
            },
          ],
        },
      });

      const result = groupUtil.hasGroupAccess(testGroupId, testGroupRole);
      expect(result).toBeFalse();
    });

    it('should return false when user has lower role than required', () => {
      const userId = '1';
      store.reset({
        auth: { userId: userId },
        groups: {
          groups: [
            {
              id: testGroupId,
              groupMembers: [{ userId: userId, groupRole: GroupRole.VIEWER }],
            },
          ],
        },
      });

      const result = groupUtil.hasGroupAccess(testGroupId, testGroupRole);
      expect(result).toBeFalse();
    });

    it('should return true when user has same or higher role than required', () => {
      const userId = '1';
      store.reset({
        auth: { userId: userId },
        groups: {
          groups: [
            {
              id: testGroupId,
              groupMembers: [{ userId: userId, groupRole: GroupRole.OWNER }],
            },
          ],
        },
      });

      const result = groupUtil.hasGroupAccess(testGroupId, testGroupRole);
      expect(result).toBeTrue();
    });
  });
});
