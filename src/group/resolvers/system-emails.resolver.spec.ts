import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { systemEmailsResolver } from './system-emails.resolver';

describe('systemEmailsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => systemEmailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
