import { TestBed } from '@angular/core/testing';

import { UsersResolverService } from './users-resolver.service';

describe('UsersResolverService', () => {
  let service: UsersResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
