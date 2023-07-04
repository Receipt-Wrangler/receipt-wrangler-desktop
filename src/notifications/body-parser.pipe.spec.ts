import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { GroupRolePipe } from 'src/pipes/group-role.pipe';
import { GroupState } from 'src/store/group.state';
import { UserState } from 'src/store/user.state';
import { BodyParserPipe } from './body-parser.pipe';

describe('BodyParserPipe', () => {
  let pipe: BodyParserPipe;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupRolePipe],
      imports: [NgxsModule.forRoot([GroupState, UserState])],
      providers: [BodyParserPipe],
    }).compileComponents();

    pipe = TestBed.inject(BodyParserPipe);
    store = TestBed.inject(Store);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should resolve userId', () => {
    const user = { id: '1', name: 'John' };
    store.reset({
      users: {
        users: [user],
      },
    });

    const result = pipe.transform('${userId:1.name}');

    expect(result).toBe('John');
  });

  it('should resolve groupId', () => {
    const group = { id: '1', name: 'Group A' };
    store.reset({
      groups: {
        groups: [group],
      },
    });

    const result = pipe.transform('${groupId:1.name:string}');

    expect(result).toBe('Group A');
  });

  it('should return empty string when id does not exist', () => {
    const result = pipe.transform('${userId:999.name}');

    expect(result).toBe('');
  });
});
