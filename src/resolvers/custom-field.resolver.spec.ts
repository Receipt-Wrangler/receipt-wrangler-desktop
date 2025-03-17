import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { customFieldResolver } from './custom-field.resolver';

describe('customFieldResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => customFieldResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
