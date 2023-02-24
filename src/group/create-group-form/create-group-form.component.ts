import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, of, startWith, switchMap, take, tap } from 'rxjs';
import { GroupsService } from 'src/api/groups.service';
import { FormMode } from 'src/enums/form-mode.enum';
import { GroupRole } from 'src/enums/group-role.enum';
import { FormConfig } from 'src/interfaces/form-config.interface';
import { Group, GroupMember } from 'src/models';
import { SnackbarService } from 'src/services/snackbar.service';
import { AddGroup } from 'src/store/group.state.actions';
import { GroupMemberFormComponent } from '../group-member-form/group-member-form.component';
import { ROLE_OPTIONS } from '../role-options';
import { buildGroupMemberForm } from '../utils/group-member.utils';

@Component({
  selector: 'app-create-group-form',
  templateUrl: './create-group-form.component.html',
  styleUrls: ['./create-group-form.component.scss'],
})
export class CreateGroupFormComponent {
  public form: FormGroup = new FormGroup({});

  public get groupMembers(): FormArray {
    return this.form.get('groupMembers') as FormArray;
  }

  public roleOptions: string[] = ROLE_OPTIONS;

  public formConfig!: FormConfig;

  public originalGroup: Group | undefined = undefined;

  public displayedColumns: string[] = ['name', 'role'];

  public disableDeleteButton: boolean = false;

  public editLink: string = '';

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
    if (this.formConfig.mode !== FormMode.view) {
      this.displayedColumns.push('actions');
    }
    this.initForm();
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
      if (owners.length === 0) {
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
