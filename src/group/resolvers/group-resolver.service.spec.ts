import { TestBed } from '@angular/core/testing';

import { GroupResolverService } from './group-resolver.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiModule } from 'src/api-new';

describe('GroupResolverService', () => {
  let service: GroupResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule, HttpClientTestingModule],
    });
    service = TestBed.inject(GroupResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
