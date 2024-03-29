import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { ApiModule } from '../open-api/api.module';
import { AppInitService } from './app-init.service';

describe('AppInitService', () => {
  let service: AppInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsModule.forRoot([]), ApiModule],
    });
    service = TestBed.inject(AppInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
