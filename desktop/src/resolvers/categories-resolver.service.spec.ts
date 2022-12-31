import { TestBed } from '@angular/core/testing';

import { CategoriesResolverService } from './categories-resolver.service';

describe('CategoriesResolverService', () => {
  let service: CategoriesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
