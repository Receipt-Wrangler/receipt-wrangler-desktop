import { TestBed } from '@angular/core/testing';
import { GroupPipe } from './group.pipe';
import { NgxsModule, Store } from '@ngxs/store';
import { pipe } from 'rxjs';
import { AuthState } from 'src/store/auth.state';
import { GroupState } from 'src/store/group.state';
import { GroupUtil } from 'src/utils';
import { GroupRolePipe } from './group-role.pipe';
import { Group } from 'src/api';

describe('GroupPipe', () => {
  let pipe: GroupPipe;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupPipe],
      imports: [NgxsModule.forRoot([GroupState])],
      providers: [GroupPipe],
    }).compileComponents();

    const groups: Group[] = [
      {
        id: 1,
      } as Group,
      { id: 2 } as Group,
    ];

    pipe = TestBed.inject(GroupPipe);
    store = TestBed.inject(Store);

    store.reset({
      groups: {
        groups: groups,
      },
    });
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should call group state', () => {
    const spy = spyOn(store, 'selectSnapshot');
    pipe.transform('hello');

    expect(spy).toHaveBeenCalled();
  });
});
