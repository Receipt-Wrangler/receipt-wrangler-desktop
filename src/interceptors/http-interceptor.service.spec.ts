import { provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { ApiModule } from "../open-api";
import { HttpInterceptorService } from "./http-interceptor.service";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("HttpInterceptorService", () => {
  let service: HttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ApiModule,
        MatSnackBarModule,
        NgxsModule.forRoot([]),
        RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(HttpInterceptorService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
