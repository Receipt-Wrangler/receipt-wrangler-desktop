import { TestBed } from '@angular/core/testing';

import { FeatureConfigService } from './feature-config.service';

describe('FeatureConfigService', () => {
  let service: FeatureConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
