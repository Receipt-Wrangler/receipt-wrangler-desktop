import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { GroupState } from 'src/store/group.state';
import { UserState } from 'src/store/user.state';
import { ParameterizedDataParser } from './paramterterized-data-parser';

describe('ParameterizedDataParser', () => {
  let parameterizedDataParser: ParameterizedDataParser;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [NgxsModule.forRoot([GroupState, UserState])],
      providers: [],
    }).compileComponents();

    parameterizedDataParser = TestBed.inject(ParameterizedDataParser);
    store = TestBed.inject(Store);
  });

  it('create an instance', () => {
    expect(parameterizedDataParser).toBeTruthy();
  });

  it('should resolve userId', () => {
    const user = { id: '1', name: 'John' };
    store.reset({
      users: {
        users: [user],
      },
    });

    const result = parameterizedDataParser.parse('${userId:1.name}');

    expect(result).toBe('John');
  });

  it('should resolve groupId', () => {
    const group = { id: '1', name: 'Group A' };
    store.reset({
      groups: {
        groups: [group],
      },
    });

    const result = parameterizedDataParser.parse('${groupId:1.name:link}');

    expect(result).toBe('Group A');
    expect(parameterizedDataParser.link).toEqual('/receipts/group/1');
  });

  it('should return empty string when id does not exist', () => {
    const result = parameterizedDataParser.parse('${userId:999.name}');

    expect(result).toBe('');
  });
});
