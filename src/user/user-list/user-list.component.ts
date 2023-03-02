import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { DEFAULT_DIALOG_CONFIG } from 'constants/dialog.constant';
import { Observable, take, tap } from 'rxjs';
import { UsersService } from 'src/api/users.service';
import { User } from 'src/models';
import { SnackbarService } from 'src/services/snackbar.service';
import { ConfirmationDialogComponent } from 'src/shared-ui/confirmation-dialog/confirmation-dialog.component';
import { AuthState } from 'src/store/auth.state';
import { UserState } from 'src/store/user.state';
import { RemoveUser } from 'src/store/user.state.actions';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  @Select(UserState.users) public users!: Observable<User[]>;

  @Select(AuthState.userId) public userId!: Observable<string>;

  public displayedColumns = [
    'username',
    'displayname',
    'userRole',
    'createdAt',
    'updatedAt',
    'actions',
  ];

  constructor(
    private matDialog: MatDialog,
    private usersService: UsersService,
    private store: Store,
    private snackbarService: SnackbarService
  ) {}

  public openUserFormDialog(user?: User): void {
    const dialogRef = this.matDialog.open(
      UserFormComponent,
      DEFAULT_DIALOG_CONFIG
    );

    dialogRef.componentInstance.user = user;
  }

  public openResetPasswordDialog(user: User): void {
    const dialogRef = this.matDialog.open(
      ResetPasswordComponent,
      DEFAULT_DIALOG_CONFIG
    );

    dialogRef.componentInstance.user = user;
  }

  public deleteUser(index: number) {
    const users = this.store.selectSnapshot(UserState.users);
    const userId = this.store.selectSnapshot(AuthState.userId);
    const user = users[index];

    if (users[index].id.toString() !== userId) {
      const dialogRef = this.matDialog.open(ConfirmationDialogComponent);

      dialogRef.componentInstance.headerText = 'Delete User';
      dialogRef.componentInstance.dialogContent = `Are you sure you would like to delete the user '${user.username}'? This will remove the user from the user from groups, the user's receipt items, groups where this user is the only member, and receipts where the user paid. This action is irreversible.`;

      dialogRef.afterClosed().subscribe((r) => {
        if (r) {
          this.usersService
            .deleteUser(user.id.toString())
            .pipe(
              take(1),
              tap(() => {
                this.snackbarService.success('User successfully deleted');
                this.store.dispatch(new RemoveUser(user.id.toString()));
              })
            )
            .subscribe();
        }
      });
    }
  }
}
