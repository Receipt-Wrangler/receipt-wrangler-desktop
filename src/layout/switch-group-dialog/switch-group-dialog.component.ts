import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Group } from 'src/api-new';
import { GroupState } from 'src/store/group.state';
import { SetSelectedGroupId } from 'src/store/group.state.actions';

@Component({
  selector: 'app-switch-group-dialog',
  templateUrl: './switch-group-dialog.component.html',
  styleUrls: ['./switch-group-dialog.component.scss'],
})
export class SwitchGroupDialogComponent {
  @Select(GroupState.groupsWithoutSelectedGroup) public groups!: Observable<
    Group[]
  >;

  public form: FormGroup = new FormGroup({});

  constructor(
    private matDialogRef: MatDialogRef<SwitchGroupDialogComponent>,
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      groupId: ['', Validators.required],
    });
  }

  public closeDialog(): void {
    this.matDialogRef.close();
  }

  public submit(): void {
    if (this.form.valid) {
      const groupId = this.form.get('groupId');
      this.store.dispatch(new SetSelectedGroupId(groupId?.value));
      this.router.navigate([`/dashboard/group/${groupId?.value}`]);
      this.matDialogRef.close();
    }
  }

  public displayWith(groupId: string): string {
    return (
      this.store.selectSnapshot(GroupState.getGroupById(groupId))?.name ?? ''
    );
  }
}
