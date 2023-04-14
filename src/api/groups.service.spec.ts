import { TestBed } from '@angular/core/testing';

import { GroupsService } from './groups.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GroupsService', () => {
  let service: GroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
