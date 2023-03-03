import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { Observable, take, tap } from 'rxjs';
import { GroupsService } from 'src/api/groups.service';
import { GroupRole } from 'src/enums/group-role.enum';
import { Group } from 'src/models';
import { SnackbarService } from 'src/services/snackbar.service';
import { ConfirmationDialogComponent } from 'src/shared-ui/confirmation-dialog/confirmation-dialog.component';
import { GroupState } from 'src/store/group.state';
import { RemoveGroup } from 'src/store/group.state.actions';
import { TableColumn } from 'src/table/table-column.interface';
import { TableComponent } from 'src/table/table/table.component';
import { DEFAULT_DIALOG_CONFIG } from '../../../constants';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent {
  @Select(GroupState.groups) public groups!: Observable<Group[]>;

  @ViewChild('nameCell') private nameCell!: TemplateRef<any>;

  @ViewChild('numberOfMembersCell')
  private numberOfMembersCell!: TemplateRef<any>;

  @ViewChild('isDefaultGroupCell') private defaultGroupCell!: TemplateRef<any>;

  @ViewChild('createdAtCell') private createdAtCell!: TemplateRef<any>;

  @ViewChild('updatedAtCell') private updatedAtCell!: TemplateRef<any>;

  @ViewChild('actionsCell') private actionsCell!: TemplateRef<any>;

  @ViewChild(TableComponent) private table!: TableComponent;

  public groupRole = GroupRole;

  public columns: TableColumn[] = [];

  public displayedColumns: string[] = [];

  public dataSource: MatTableDataSource<Group> =
    new MatTableDataSource<Group>();

  constructor(
    private groupsService: GroupsService,
    private store: Store,
    private snackbarService: SnackbarService,
    private matDialog: MatDialog
  ) {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this.initTable();
  }

  private initTable(): void {
    this.setColumns();
    this.setDataSource();
  }

  private setColumns(): void {
    this.columns = [
      {
        columnHeader: 'Name',
        matColumnDef: 'name',
        template: this.nameCell,
        sortable: true,
      },
      {
        columnHeader: 'Number of Members',
        matColumnDef: 'numberOfMembers',
        template: this.numberOfMembersCell,
        sortable: true,
      },
      {
        columnHeader: 'Is Default Group',
        matColumnDef: 'isDefault',
        template: this.defaultGroupCell,
        sortable: true,
      },
      {
        columnHeader: 'Created At',
        matColumnDef: 'createdAt',
        template: this.createdAtCell,
        sortable: true,
      },
      {
        columnHeader: 'Updated At',
        matColumnDef: 'updatedAt',
        template: this.updatedAtCell,
        sortable: true,
      },
      {
        columnHeader: 'Actions',
        matColumnDef: 'actions',
        template: this.actionsCell,
        sortable: false,
      },
    ];
    this.displayedColumns = [
      'name',
      'numberOfMembers',
      'isDefault',
      'createdAt',
      'updatedAt',
      'actions',
    ];
  }

  private setDataSource(): void {
    const groups = this.store.selectSnapshot(GroupState.groups);
    this.dataSource = new MatTableDataSource<Group>(groups);
    this.dataSource.sort = this.table.sort;
  }

  public deleteGroup(index: number): void {
    const groups = this.dataSource.data;
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
                this.dataSource.data = this.store.selectSnapshot(
                  GroupState.groups
                );
              })
            )
            .subscribe();
        }
      });
    }
  }
}
