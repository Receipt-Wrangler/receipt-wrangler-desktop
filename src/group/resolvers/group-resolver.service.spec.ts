import { TestBed } from '@angular/core/testing';

import { GroupResolverService } from './group-resolver.service';

describe('GroupResolverService', () => {
  let service: GroupResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
