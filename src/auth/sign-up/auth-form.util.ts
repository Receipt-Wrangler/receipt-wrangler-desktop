import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { catchError, map, Observable, of, switchMap, tap } from "rxjs";
import { AuthService } from "../../api";
import { AppInitService, SnackbarService } from "../../services";

@Injectable()
export class AuthFormUtil {
  constructor(
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private appInitService: AppInitService
  ) {}

  public getSubmitObservable(
    form: FormGroup,
    isSignUp: boolean
  ): Observable<void> {
    const isValid = form.valid;

    if (isValid && isSignUp) {
      return this.authService.signUp(form.value).pipe(
        tap(() => {
          this.snackbarService.success("User successfully signed up");
        }),
        catchError((err) =>
          of(this.snackbarService.error(err.error["username"] ?? err["errMsg"]))
        )
      );
    } else if (isValid && !isSignUp) {
      return this.authService.login(form.value).pipe(
        tap(() => {
          this.snackbarService.success("Successfully logged in");
        }),
        switchMap(() => this.appInitService.getAppData()),
        map(() => undefined)
      );
    } else {
      return of(undefined);
    }
  }
}
