import { TestBed } from '@angular/core/testing';

import { FeatureConfigService } from './feature-config.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FeatureConfigService', () => {
  let service: FeatureConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FeatureConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
