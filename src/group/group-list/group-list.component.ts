import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable, take, tap } from 'rxjs';
import { GroupsService } from 'src/api/groups.service';
import { GroupRole } from 'src/enums/group-role.enum';
import { Group } from 'src/models';
import { SnackbarService } from 'src/services/snackbar.service';
import { ConfirmationDialogComponent } from 'src/shared-ui/confirmation-dialog/confirmation-dialog.component';
import { GroupState } from 'src/store/group.state';
import { RemoveGroup } from 'src/store/group.state.actions';
import { DEFAULT_DIALOG_CONFIG } from '../../../constants';

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
    private snackbarService: SnackbarService,
    private matDialog: MatDialog
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
    const groups = this.store.selectSnapshot(GroupState.groups);
    if (groups.length > 1) {
      const group = groups[index];
      const dialogRef = this.matDialog.open(
        ConfirmationDialogComponent,
        DEFAULT_DIALOG_CONFIG
      );

      dialogRef.componentInstance.headerText = 'Delete Group';
      dialogRef.componentInstance.dialogContent = `Are you sure you would like to the group '${group.name}'? All receipts will be deleted as a result.`;

      dialogRef.afterClosed().subscribe((r) => {
        if (r) {
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
      });
    }
  }
}
