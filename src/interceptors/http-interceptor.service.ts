import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { catchError, Observable, of, switchMap, take, throwError } from 'rxjs';
import { AuthService } from 'src/api/auth.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { AuthState } from 'src/store/auth.state';

@Injectable({
  providedIn: 'root',
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
    return next.handle(this.addTokenToRequest(req)).pipe(
      catchError((e: HttpErrorResponse) => {
        const regex = new RegExp('5d{2}');
        if (e.error?.errorMsg) {
          this.snackbarService.error(e.error?.errorMsg);
        }
        if (e.status === HttpStatusCode.Unauthorized) {
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

  private addTokenToRequest(req: HttpRequest<any>): HttpRequest<any> {
    const token = this.store.selectSnapshot(AuthState.token);
    if (token) {
      return req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      return req.clone();
    }
  }
}
