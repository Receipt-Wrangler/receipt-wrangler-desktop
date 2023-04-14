import { TestBed } from '@angular/core/testing';

import { TagsResolverService } from './tags-resolver.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TagsResolverService', () => {
  let service: TagsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TagsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
