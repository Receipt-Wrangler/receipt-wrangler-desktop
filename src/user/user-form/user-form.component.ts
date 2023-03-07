import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { catchError, iif, of, switchMap, take, tap } from 'rxjs';
import { AuthService } from 'src/api/auth.service';
import { UsersService } from 'src/api/users.service';
import { UserRole } from 'src/enums/user_role.enum';
import { User } from 'src/models';
import { SnackbarService } from 'src/services/snackbar.service';
import { AuthState } from 'src/store/auth.state';
import { AddUser, UpdateUser } from 'src/store/user.state.actions';
import { UserValidators } from 'src/validators/user-validators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [UserValidators],
})
export class UserFormComponent implements OnInit {
  @Input() public user?: User;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private snackbarService: SnackbarService,
    private matDialogRef: MatDialogRef<UserFormComponent>,
    private store: Store,
    private authService: AuthService,
    private userValidators: UserValidators
  ) {}

  public form: FormGroup = new FormGroup({});

  public userRoleOptions: string[] = [];

  public ngOnInit(): void {
    this.initForm();
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
              this.authService
                .getNewRefreshToken()
                .pipe(
                  switchMap(() =>
                    this.usersService.getAndSetClaimsForLoggedInUser()
                  )
                ),
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
