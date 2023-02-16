import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/models';
import { UserState } from 'src/store/user.state';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  @Select(UserState.users) public users!: Observable<User[]>;

  public displayedColumns = [
    'username',
    'displayname',
    'userRole',
    'createdAt',
    'updatedAt',
    'actions',
  ];

  constructor(private matDialog: MatDialog) {}

  public openUserFormDialog(user?: User): void {
    const dialogRef = this.matDialog.open(UserFormComponent, {});

    dialogRef.componentInstance.user = user;
  }

  public openResetPasswordDialog(user: User): void {
    const dialogRef = this.matDialog.open(ResetPasswordComponent, {});

    dialogRef.componentInstance.user = user;
  }
}
