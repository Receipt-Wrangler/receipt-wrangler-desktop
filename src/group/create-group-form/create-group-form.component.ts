import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { GroupsService } from 'src/api/groups.service';
import { ROLE_OPTIONS } from '../role-options';

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

  constructor(
    private formBuilder: FormBuilder,
    private groupsService: GroupsService
  ) {}

  public ngOnInit(): void {
    this.initForm();
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
      groupId: '',
    });
  }

  public removeGroupMember(index: number): void {
    this.groupMembers.removeAt(index);
  }

  public submit(): void {
    console.warn(this.form.value);
    if (this.form.valid) {
      //this.groupsService.createGroup(this.form.value).pipe(take(1)).subscribe();
    }
  }
}
