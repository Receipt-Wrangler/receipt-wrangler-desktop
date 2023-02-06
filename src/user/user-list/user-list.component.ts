import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/models';
import { UserState } from 'src/store/user.state';

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
  ];
}
