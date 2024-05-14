import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { receiptProcessingSettingsResolver } from './receipt-processing-settings.resolver';

describe('receiptProcessingSettingsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => receiptProcessingSettingsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
