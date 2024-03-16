import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode, } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { catchError, Observable, switchMap, take, throwError } from "rxjs";
import { AuthService } from "../open-api";
import { SnackbarService } from "../services";
import { AuthState } from "../store";

@Injectable({
  providedIn: "root",
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private store: Store,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((e: HttpErrorResponse) => {
        const isLoggedIn = this.store.selectSnapshot(AuthState.isLoggedIn);
        if (!isLoggedIn && req.url.includes("token")) {
          return next.handle(req);
        }

        const regex = new RegExp("5d{2}");
        if (e.error?.errorMsg) {
          this.snackbarService.error(e.error?.errorMsg);
        }
        if (e.status === HttpStatusCode.BadRequest) {
          return this.refreshToken(req, next);
        } else if (regex.test(e.status.toString())) {
          this.snackbarService.error(e.message);
        }

        return next.handle(req);
      })
    );
  }

  private refreshToken(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.getNewRefreshToken().pipe(
      take(1),
      switchMap(() => next.handle(req)),
      catchError((e) => throwError(() => e))
    );
  }
}
