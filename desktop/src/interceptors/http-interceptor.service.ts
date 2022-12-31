import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, of, take } from 'rxjs';
import { AuthService } from 'src/api/auth.service';
import { AuthState } from 'src/store/auth.state';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private store: Store, private authService: AuthService) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const url = req.url.toString();
    if (!(url.includes('signup') || url.includes('login'))) {
      const isTokenExpired = this.store.selectSnapshot(
        AuthState.isTokenExpired
      );
      if (isTokenExpired) {
        // try and get another one
        this.authService
          .getNewRefreshToken()
          .pipe(take(1))
          .subscribe(() => {
            return next.handle(this.addTokenToRequest(req));
          });
      }
      return next.handle(this.addTokenToRequest(req));
    }
    return next.handle(req);
  }

  private addTokenToRequest(req: HttpRequest<any>): HttpRequest<any> {
    const token = this.store.selectSnapshot(AuthState.token);
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
