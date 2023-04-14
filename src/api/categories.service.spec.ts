import { TestBed } from '@angular/core/testing';

import { CategoriesService } from './categories.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
