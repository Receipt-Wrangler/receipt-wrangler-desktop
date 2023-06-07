import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import {
  catchError,
  defer,
  iif,
  of,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { AuthService } from 'src/api/auth.service';
import { UsersService } from 'src/api/users.service';
import { UserRole } from 'src/enums/user_role.enum';
import { User } from 'src/models';
import { SnackbarService } from 'src/services/snackbar.service';
import { AuthState } from 'src/store/auth.state';
import { AddUser, UpdateUser } from 'src/store/user.state.actions';
import { UserValidators } from 'src/validators/user-validators';

@UntilDestroy()
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [UserValidators],
})
export class UserFormComponent implements OnInit {
  @Input() public user?: User;

  public isDummerUserHelpText: string =
    'A dummy user is a user who cannot log in, but can still act as a receipt payer, or be charged shares. Dummy users can be converted to normal users, but normal users cannot be converted to dummy users.';

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private snackbarService: SnackbarService,
    public matDialogRef: MatDialogRef<UserFormComponent>,
    private store: Store,
    private authService: AuthService,
    private userValidators: UserValidators
  ) {}

  public form: FormGroup = new FormGroup({});

  public userRoleOptions: string[] = [];

  public ngOnInit(): void {
    this.initForm();
    if (!this.user) {
      this.listenToIsDummyChanges();
    }
  }

  private listenToIsDummyChanges(): void {
    this.form
      .get('isDummyUser')
      ?.valueChanges.pipe(
        startWith(this.form.get('isDummyUser')?.value),
        tap((isDummyUser: boolean) => {
          const passwordField = this.form.get('password');
          if (isDummyUser) {
            passwordField?.removeValidators(Validators.required);
            passwordField?.setValue('');
            passwordField?.disable();
          } else {
            passwordField?.setValue('');
            passwordField?.enable();
            passwordField?.addValidators(Validators.required);
          }
        })
      )
      .subscribe();
  }

  private initForm(): void {
    this.userRoleOptions = Object.keys(UserRole);
    this.form = this.formBuilder.group({
      displayName: [this.user?.displayName ?? '', Validators.required],
      username: [
        this.user?.username ?? '',
        Validators.required,
        this.userValidators.uniqueUsername(0, this.user?.username ?? ''),
      ],
      userRole: [this.user?.userRole ?? '', Validators.required],
    });

    if (!this.user) {
      this.form.addControl(
        'password',
        new FormControl('', Validators.required)
      );
      this.form.addControl('isDummyUser', new FormControl(false));
    }
  }

  public submit(): void {
    if (this.form.valid && this.user) {
      this.usersService
        .updateUser(this.user.id.toString(), this.form.value)
        .pipe(
          take(1),
          tap(() => {
            this.snackbarService.success('User successfully updated');
          }),
          switchMap(() =>
            this.store.dispatch(
              new UpdateUser(this.user?.id.toString() as string, {
                ...this.user,
                ...this.form.value,
              })
            )
          ),
          switchMap(() =>
            iif(
              () =>
                this.store.selectSnapshot(AuthState.loggedInUser).id ===
                this.user?.id,
              defer(() => this.authService.getNewRefreshToken()),
              of(undefined)
            )
          ),
          tap(() => this.matDialogRef.close(true))
        )
        .subscribe();
    } else if (this.form.valid && !this.user) {
      this.usersService
        .createUser(this.form.value)
        .pipe(
          take(1),
          switchMap((u) => this.store.dispatch(new AddUser(u))),
          tap(() => {
            this.snackbarService.success('User successfully created');
          }),
          catchError((err) => {
            return of(
              this.snackbarService.error(err.error['username'] ?? err['errMsg'])
            );
          }),
          tap(() => this.matDialogRef.close(true))
        )
        .subscribe();
    }
  }

  public closeModal(): void {
    this.matDialogRef.close(false);
  }
}
