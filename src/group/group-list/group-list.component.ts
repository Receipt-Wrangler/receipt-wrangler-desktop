import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Group } from 'src/models';
import { GroupState } from 'src/store/group.state';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent {
  @Select(GroupState.groups) public groups!: Observable<Group[]>;

  public displayedColumns = [
    'name',
    'numberOfMembers',
    'defaultGroup',
    'createdAt',
    'updatedAt',
    'actions',
  ];
}
