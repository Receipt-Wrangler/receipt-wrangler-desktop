import { TestBed } from '@angular/core/testing';

import { TagsResolverService } from './tags-resolver.service';

describe('TagsResolverService', () => {
  let service: TagsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
