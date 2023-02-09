import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { finalize, iif, of, switchMap, take, tap } from 'rxjs';
import { AuthService } from 'src/api/auth.service';
import { UsersService } from 'src/api/users.service';
import { UserRole } from 'src/enums/user_role.enum';
import { User } from 'src/models';
import { SnackbarService } from 'src/services/snackbar.service';
import { AuthState } from 'src/store/auth.state';
import { UpdateUser } from 'src/store/user.state.actions';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() public user?: User;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private snackbarService: SnackbarService,
    private matDialogRef: MatDialogRef<UserFormComponent>,
    private store: Store,
    private authService: AuthService
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
      username: [this.user?.username ?? '', Validators.required],
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
              this.authService.getNewRefreshToken(),
              of(undefined)
            )
          ),
          finalize(() => this.matDialogRef.close())
        )
        .subscribe();
    } else if (this.form.valid && !this.user) {
      this.usersService
        .createUser(this.form.value)
        .pipe(
          take(1),
          tap(() => {
            this.snackbarService.success('User successfully created');
          }),
          finalize(() => this.matDialogRef.close())
        )
        .subscribe();
    }
  }

  public closeModal(): void {
    this.matDialogRef.close();
  }
}
