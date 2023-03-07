import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { startWith, switchMap, take, tap } from 'rxjs';
import { GroupsService } from 'src/api/groups.service';
import { FormMode } from 'src/enums/form-mode.enum';
import { GroupRole } from 'src/enums/group-role.enum';
import { FormConfig } from 'src/interfaces/form-config.interface';
import { Group, GroupMember } from 'src/models';
import { SnackbarService } from 'src/services/snackbar.service';
import { AddGroup } from 'src/store/group.state.actions';
import { UserState } from 'src/store/user.state';
import { TableColumn } from 'src/table/table-column.interface';
import { TableComponent } from 'src/table/table/table.component';
import { GroupMemberFormComponent } from '../group-member-form/group-member-form.component';
import { ROLE_OPTIONS } from '../role-options';
import { buildGroupMemberForm } from '../utils/group-member.utils';

@Component({
  selector: 'app-create-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
})
export class GroupFormComponent implements OnInit, AfterViewInit {
  @ViewChild('nameCell') public nameCell!: TemplateRef<any>;

  @ViewChild('groupRoleCell') public groupRoleCell!: TemplateRef<any>;

  @ViewChild('actionsCell') public actionsCell!: TemplateRef<any>;

  @ViewChild(TableComponent) public table!: TableComponent;

  public form: FormGroup = new FormGroup({});

  public get groupMembers(): FormArray {
    return this.form.get('groupMembers') as FormArray;
  }

  public roleOptions: string[] = ROLE_OPTIONS;

  public formConfig!: FormConfig;

  public originalGroup: Group | undefined = undefined;

  public displayedColumns: string[] = [];

  public columns: TableColumn[] = [];

  public disableDeleteButton: boolean = false;

  public editLink: string = '';

  public groupRole = GroupRole;

  public dataSource: MatTableDataSource<GroupMember> =
    new MatTableDataSource<GroupMember>([]);

  constructor(
    private formBuilder: FormBuilder,
    private groupsService: GroupsService,
    private snackbarService: SnackbarService,
    private router: Router,
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.originalGroup = this.activatedRoute.snapshot.data['group'];
    this.formConfig = this.activatedRoute.snapshot.data['formConfig'];
    if (this.originalGroup) {
      this.editLink = `/groups/${this.originalGroup.id}/edit`;
    }
    this.initForm();
  }

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
        columnHeader: 'Group Role',
        matColumnDef: 'groupRole',
        template: this.groupRoleCell,
        sortable: true,
      },
      {
        columnHeader: 'Actions',
        matColumnDef: 'actions',
        template: this.actionsCell,
        sortable: true,
      },
    ];
    this.displayedColumns = ['name', 'groupRole'];

    if (this.formConfig.mode !== FormMode.view) {
      this.displayedColumns.push('actions');
    }
  }

  private setDataSource(): void {
    this.dataSource = new MatTableDataSource<GroupMember>(
      this.groupMembers.value ?? []
    );
    this.dataSource.sort = this.table.sort;
  }

  public sortName(sortState: Sort): void {
    if (sortState.active === 'name') {
      if (sortState.direction === '') {
        this.dataSource.data = this.groupMembers.value;
        return;
      }

      const newData = Array.from(this.dataSource.data);
      newData.sort((a, b) => {
        const aDisplayName =
          this.store.selectSnapshot(UserState.getUserById(a.userId.toString()))
            ?.displayName ?? '';
        const bDisplayName =
          this.store.selectSnapshot(UserState.getUserById(b.userId.toString()))
            ?.displayName ?? '';

        if (sortState.direction === 'asc') {
          return aDisplayName.localeCompare(bDisplayName);
        } else {
          return bDisplayName.localeCompare(aDisplayName);
        }
      });

      this.dataSource.data = newData;
    }
  }

  private initForm(): void {
    let groupMembers: FormGroup[] = [];
    if (this.originalGroup?.groupMembers) {
      groupMembers = this.originalGroup.groupMembers.map((m) =>
        buildGroupMemberForm(m)
      );
    }
    this.form = this.formBuilder.group({
      name: [this.originalGroup?.name ?? '', Validators.required],
      groupMembers: this.formBuilder.array(groupMembers),
    });

    this.groupMembers.valueChanges
      .pipe(
        startWith(this.groupMembers.value),
        tap((v) => {
          this.disableDeleteButton = v.length === 1;
        })
      )
      .subscribe();
  }

  public addGroupMemberClicked(): void {
    const dialogRef = this.matDialog.open(GroupMemberFormComponent);

    dialogRef.componentInstance.currentGroupMembers = this.groupMembers.value;

    dialogRef.afterClosed().subscribe((form) => {
      if (form) {
        this.groupMembers.push(form);
      }
    });
  }

  public editGroupMemberClicked(index: number): void {
    const groupMember = this.originalGroup?.groupMembers[index];
    const dialogRef = this.matDialog.open(GroupMemberFormComponent);

    dialogRef.componentInstance.currentGroupMembers = this.groupMembers.value;
    dialogRef.componentInstance.groupMember = groupMember;

    dialogRef.afterClosed().subscribe((form) => {
      if (form) {
        this.groupMembers.at(index).patchValue(form.value);
      }
    });
  }

  public removeGroupMember(index: number): void {
    this.groupMembers.removeAt(index);
  }

  public submit(): void {
    if (this.form.valid) {
      const owners = (this.groupMembers.value as GroupMember[]).filter(
        (gm) => gm.groupRole === GroupRole.OWNER
      );
      if (owners.length === 0 && this.formConfig.mode !== FormMode.add) {
        this.snackbarService.error('Group must have at least one owner!');
        return;
      }
      switch (this.formConfig.mode) {
        case FormMode.add:
          this.createGroup();

          break;
        case FormMode.edit:
          this.updateGroup();
          break;

        default:
          break;
      }
    }
  }

  private createGroup(): void {
    this.groupsService
      .createGroup(this.form.value)
      .pipe(
        take(1),
        tap(() => {
          this.snackbarService.success('Group successfully created');
        }),
        switchMap((group) => this.store.dispatch(new AddGroup(group))),
        tap(() => this.router.navigateByUrl('/groups'))
      )
      .subscribe();
  }

  private updateGroup(): void {
    this.groupsService
      .updateGroup(this.form.value, this.originalGroup?.id.toString() as string)
      .pipe(
        take(1),
        tap(() => {
          this.snackbarService.success('Group successfully updated');
        })
      )
      .subscribe();
  }
}