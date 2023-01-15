import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  DEFAULT_SNACKBAR_ACTION,
  DEFAULT_SNACKBAR_CONFIG,
} from '../../../constants';
import { catchError, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/api/auth.service';
import { applyApiErrors } from 'src/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/api/users.service';
import { Store } from '@ngxs/store';
import { SetUsers } from 'src/store/user.state.actions';
import { User } from 'src/models/user';
import { SnackbarService } from 'src/services/snackbar.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public isSignUp: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private store: Store,
    private snackbarService: SnackbarService
  ) {}

  public ngOnInit(): void {
    this.snackbarService.error('test');
    this.route.data
      .pipe(
        tap((data) => {
          this.isSignUp = !!data?.['isSignUp'];
        })
      )
      .subscribe();
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
    if (this.isSignUp) {
      this.form.addControl(
        'displayname',
        new FormControl('', Validators.required)
      );
    }
  }

  public submit(): void {
    const isValid = this.form.valid;
    if (isValid && this.isSignUp) {
      this.authService
        .signUp(this.form.value)
        .pipe(
          tap(() => {
            this.snackbar.open(
              'Successfully registered!',
              DEFAULT_SNACKBAR_ACTION,
              DEFAULT_SNACKBAR_CONFIG
            );
          }),
          catchError((err) =>
            of(
              this.snackbarService.error(err.error['username'] ?? err['errMsg'])
            )
          )
        )
        .subscribe();
    } else if (isValid && !this.isSignUp) {
      this.authService
        .login(this.form.value)
        .pipe(
          tap(() => {
            this.snackbar.open(
              'Successfully logged in!',
              DEFAULT_SNACKBAR_ACTION,
              DEFAULT_SNACKBAR_CONFIG
            );
          }),
          switchMap(() => this.usersService.getAllUsers()),
          switchMap((users: User[]) =>
            this.store.dispatch(new SetUsers(users))
          ),
          tap(() => this.router.navigate(['/dashboard']))
        )
        .subscribe();
    }
  }
}
