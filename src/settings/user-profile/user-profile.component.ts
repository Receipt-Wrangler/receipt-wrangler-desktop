import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  AuthService,
  AuthState,
  ClaimsService,
  UpdateUser,
  User,
  UserService,
} from '@receipt-wrangler/receipt-wrangler-core';
import { switchMap, take, tap } from 'rxjs';
import { FormMode } from 'src/enums/form-mode.enum';
import { FormConfig } from 'src/interfaces';
import { SnackbarService } from '@receipt-wrangler/receipt-wrangler-core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public form: FormGroup = new FormGroup({});

  public user!: User;

  public formConfig!: FormConfig;

  public formMode = FormMode;

  public usernameTooltip: string =
    'Only system admin may change your username.';

  constructor(
    private authService: AuthService,
    private claimsService: ClaimsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
    private store: Store,
    private userService: UserService
  ) {}

  public ngOnInit(): void {
    this.user = this.store.selectSnapshot(AuthState.loggedInUser);
    this.formConfig = this.route?.snapshot?.data?.['formConfig'];
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      username: this.user?.username ?? '',
      displayName: [this.user?.displayName ?? '', Validators.required],
      defaultAvatarColor: [
        this.user?.defaultAvatarColor ?? '',
        Validators.pattern('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'),
      ],
    });

    if (this.formConfig.mode === FormMode.edit) {
      this.form.get('username')?.disable();
    }
  }

  public submit(): void {
    if (this.form.valid) {
      this.userService
        .updateUserProfile(this.form.value)
        .pipe(
          take(1),
          switchMap(() => this.authService.getNewRefreshToken()),
          switchMap(() => this.claimsService.getAndSetClaimsForLoggedInUser()),
          switchMap(() => {
            const loggedInUser = this.store.selectSnapshot(
              AuthState.loggedInUser
            );
            return this.store.dispatch(
              new UpdateUser(loggedInUser.id.toString(), loggedInUser)
            );
          }),
          tap(() => {
            this.snackbarService.success('User profile successfully updated');
          })
        )
        .subscribe();
    }
  }
}
