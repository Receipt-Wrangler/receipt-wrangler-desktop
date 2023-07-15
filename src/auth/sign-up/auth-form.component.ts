import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { catchError, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/api-new';
import { AppInitService } from 'src/services/app-init.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { GroupState } from 'src/store/group.state';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthForm implements OnInit {
  public form: FormGroup = new FormGroup({});
  public isSignUp: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private snackbarService: SnackbarService,
    private appInitService: AppInitService
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
            this.snackbarService.success('User successfully signed up');
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
            this.snackbarService.success('Successfully logged in');
          }),
          switchMap(() => this.appInitService.getAppData()),
          tap(() =>
            this.router.navigate([
              this.store.selectSnapshot(GroupState.dashboardLink),
            ])
          )
        )
        .subscribe();
    }
  }
}
