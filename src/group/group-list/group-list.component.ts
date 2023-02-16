import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Group } from 'src/models';
import { GroupState } from 'src/store/group.state';
import { CreateGroupFormComponent } from '../create-group-form/create-group-form.component';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent {
  @Select(GroupState.groups) public groups!: Observable<Group[]>;

  constructor(private matDialog: MatDialog) {}

  public displayedColumns = [
    'name',
    'numberOfMembers',
    'defaultGroup',
    'createdAt',
    'updatedAt',
    'actions',
  ];

  public openCreateGroupDialog(): void {
    this.matDialog.open(CreateGroupFormComponent);
  }
}
