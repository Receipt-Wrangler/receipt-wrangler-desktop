import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { ApiModule } from "@noah231515/receipt-wrangler-core";

import { HttpInterceptorService } from "./http-interceptor.service";

describe('HttpInterceptorService', () => {
  let service: HttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        NgxsModule.forRoot([]),
        RouterTestingModule,
      ],
    });
    service = TestBed.inject(HttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
