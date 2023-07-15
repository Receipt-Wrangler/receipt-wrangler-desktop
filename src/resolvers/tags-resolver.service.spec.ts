import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiModule } from 'src/api-new';
import { TagsResolverService } from './tags-resolver.service';

describe('TagsResolverService', () => {
  let service: TagsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule, HttpClientTestingModule],
    });
    service = TestBed.inject(TagsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
