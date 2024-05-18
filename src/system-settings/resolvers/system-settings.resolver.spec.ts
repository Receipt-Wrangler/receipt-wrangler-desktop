import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { systemSettingsResolver } from './system-settings.resolver';

describe('systemSettingsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => systemSettingsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
