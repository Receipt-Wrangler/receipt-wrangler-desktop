import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { systemEmailResolver } from './system-email.resolver';

describe('systemEmailResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => systemEmailResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
