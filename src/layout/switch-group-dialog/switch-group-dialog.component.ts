import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Group } from 'src/models';
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

  public formControl: FormControl = new FormControl('', Validators.required);

  constructor(
    private matDialogRef: MatDialogRef<SwitchGroupDialogComponent>,
    private store: Store,
    private router: Router
  ) {}

  public ngOnInit(): void {}

  public closeDialog(): void {
    this.matDialogRef.close();
  }

  public submit(): void {
    if (this.formControl.valid) {
      this.store.dispatch(new SetSelectedGroupId(this.formControl.value));
    }
  }

  public displayWith(groupId: string): string {
    return (
      this.store.selectSnapshot(GroupState.getGroupById(groupId))?.name ?? ''
    );
  }
}
