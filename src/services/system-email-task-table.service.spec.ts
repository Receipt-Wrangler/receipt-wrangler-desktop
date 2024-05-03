import { TestBed } from '@angular/core/testing';

import { SystemEmailTaskTableService } from './system-email-task-table.service';

describe('SystemEmailTaskTableService', () => {
  let service: SystemEmailTaskTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemEmailTaskTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
