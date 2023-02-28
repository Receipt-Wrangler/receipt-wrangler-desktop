import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, take, tap } from 'rxjs';
import { GroupsService } from 'src/api/groups.service';
import { GroupRole } from 'src/enums/group-role.enum';
import { Group } from 'src/models';
import { SnackbarService } from 'src/services/snackbar.service';
import { GroupState } from 'src/store/group.state';
import { RemoveGroup } from 'src/store/group.state.actions';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent {
  @Select(GroupState.groups) public groups!: Observable<Group[]>;

  public groupRole = GroupRole;

  constructor(
    private groupsService: GroupsService,
    private store: Store,
    private snackbarService: SnackbarService
  ) {}

  public displayedColumns = [
    'name',
    'numberOfMembers',
    'defaultGroup',
    'createdAt',
    'updatedAt',
    'actions',
  ];

  public deleteGroup(index: number): void {
    const group = this.store.selectSnapshot(GroupState.groups)[index];
    this.groupsService
      .deleteGroup(group.id.toString())
      .pipe(
        take(1),
        tap(() => {
          this.snackbarService.success('Group successfully deleted');
          this.store.dispatch(new RemoveGroup(group.id.toString()));
        })
      )
      .subscribe();
  }
}
