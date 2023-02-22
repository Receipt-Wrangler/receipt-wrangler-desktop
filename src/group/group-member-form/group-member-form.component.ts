import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/store/auth.state';
import { ROLE_OPTIONS } from '../role-options';
import { buildGroupMemberForm } from '../utils/group-member.utils';

@Component({
  selector: 'app-group-member-form',
  templateUrl: './group-member-form.component.html',
  styleUrls: ['./group-member-form.component.scss'],
})
export class GroupMemberFormComponent implements OnInit {
  @Select(AuthState.userId) public userId!: Observable<string>;

  public form: FormGroup = new FormGroup({});

  public roleOptions: string[] = ROLE_OPTIONS;

  constructor(private matDialogRef: MatDialogRef<GroupMemberFormComponent>) {}

  public ngOnInit(): void {
    this.form = buildGroupMemberForm();
  }

  public closeModal(): void {
    this.matDialogRef.close();
  }

  public submit(): void {}
}
