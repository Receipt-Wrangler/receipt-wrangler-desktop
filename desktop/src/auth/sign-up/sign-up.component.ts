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
import { catchError, of, tap } from 'rxjs';
import { AuthService } from 'src/api/auth.service';
import { applyApiErrors } from 'src/utils';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router
  ) {}

  public ngOnInit(): void {
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
          catchError((err) => of(applyApiErrors(this.form, err)))
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
            this.router.navigate(['/dashboard']);
          })
        )
        .subscribe();
    }
  }
}
