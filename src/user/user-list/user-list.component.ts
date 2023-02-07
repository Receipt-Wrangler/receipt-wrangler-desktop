import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/models';
import { UserState } from 'src/store/user.state';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  constructor(private matDialog: MatDialog) {}

  @Select(UserState.users) public users!: Observable<User[]>;

  public displayedColumns = [
    'username',
    'displayname',
    'userRole',
    'createdAt',
    'updatedAt',
    'actions',
  ];

  public openUserFormModal(): void {
    this.matDialog.open(UserFormComponent);
  }
}
