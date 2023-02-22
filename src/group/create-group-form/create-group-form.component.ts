import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, switchMap, take, tap } from 'rxjs';
import { GroupsService } from 'src/api/groups.service';
import { FormConfig } from 'src/interfaces/form-config.interface';
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

  constructor(
    private formBuilder: FormBuilder,
    private groupsService: GroupsService,
    private snackbarService: SnackbarService,
    private router: Router,
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.initForm();
    this.formConfig = this.activatedRoute.snapshot.data['formConfig'];
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      groupMembers: this.formBuilder.array([]),
    });
  }

  public addGroupMember(): void {
    this.groupMembers.push(this.buildGroupMemberForm());
  }

  private buildGroupMemberForm(): FormGroup {
    return this.formBuilder.group({
      userId: ['', Validators.required],
      groupRole: ['', Validators.required],
      groupId: undefined,
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
