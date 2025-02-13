import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngxs/store";
import { catchError, Observable, throwError } from "rxjs";
import { SnackbarService } from "../services";
import { AuthState } from "../store";

@Injectable({
  providedIn: "root",
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
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
          return throwError(e);
        }

        const regex = new RegExp("5d{2}");
        const receiptQueueMode = this.activatedRoute.snapshot.queryParams["queueMode"];

        // NOTE: We check for queueMode to gracefully handle creating queues with mixed permissions
        if (e.error?.errorMsg && !receiptQueueMode) {
          this.snackbarService.error(e.error?.errorMsg);
        }
        if (regex.test(e.status.toString())) {
          this.snackbarService.error(e.message);
        }

        return throwError(e);
      })
    );
  }

}
