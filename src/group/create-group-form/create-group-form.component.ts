import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, switchMap, take, tap } from 'rxjs';
import { GroupsService } from 'src/api/groups.service';
import { FormConfig } from 'src/interfaces/form-config.interface';
import { Group, GroupMember } from 'src/models';
import { SnackbarService } from 'src/services/snackbar.service';
import { AuthState } from 'src/store/auth.state';
import { AddGroup } from 'src/store/group.state.actions';
import { ROLE_OPTIONS } from '../role-options';

@Component({
  selector: 'app-create-group-form',
  templateUrl: './create-group-form.component.html',
  styleUrls: ['./create-group-form.component.scss'],
})
export class CreateGroupFormComponent {
  @Select(AuthState.userId) public userId!: Observable<string>;

  public form: FormGroup = new FormGroup({});

  public get groupMembers(): FormArray {
    return this.form.get('groupMembers') as FormArray;
  }

  public roleOptions: string[] = ROLE_OPTIONS;

  public formConfig!: FormConfig;

  public originalGroup: Group | undefined = undefined;

  public displayedColumns: string[] = ['name', 'role'];

  constructor(
    private formBuilder: FormBuilder,
    private groupsService: GroupsService,
    private snackbarService: SnackbarService,
    private router: Router,
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.originalGroup = this.activatedRoute.snapshot.data['group'];
    this.formConfig = this.activatedRoute.snapshot.data['formConfig'];
    this.initForm();
  }

  private initForm(): void {
    let groupMembers: FormGroup[] = [];
    if (this.originalGroup?.groupMembers) {
      groupMembers = this.originalGroup.groupMembers.map((m) =>
        this.buildGroupMemberForm(m)
      );
    }
    this.form = this.formBuilder.group({
      name: [this.originalGroup?.name ?? '', Validators.required],
      groupMembers: this.formBuilder.array(groupMembers),
    });
  }

  public addGroupMember(): void {
    this.groupMembers.push(this.buildGroupMemberForm());
  }

  private buildGroupMemberForm(groupMember?: GroupMember): FormGroup {
    return this.formBuilder.group({
      userId: [groupMember?.userId ?? '', Validators.required],
      groupRole: [groupMember?.groupRole ?? '', Validators.required],
      groupId: [groupMember?.groupId ?? ''],
    });
  }

  public removeGroupMember(index: number): void {
    this.groupMembers.removeAt(index);
  }

  public submit(): void {
    if (this.form.valid) {
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
  }
}
