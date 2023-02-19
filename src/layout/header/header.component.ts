import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { map, Observable, of } from 'rxjs';
import { User } from 'src/models';
import { AuthState } from 'src/store/auth.state';
import { GroupState } from 'src/store/group.state';
import { DEFAULT_DIALOG_CONFIG } from '../../../constants';
import { SwitchGroupDialogComponent } from '../switch-group-dialog/switch-group-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Select(AuthState.isLoggedIn) public isLoggedIn!: Observable<boolean>;

  @Select(GroupState.selectedGroupId)
  public selectedGroupId!: Observable<boolean>;

  @Select(AuthState.loggedInUser) public loggedInUser!: Observable<User>;

  public receiptHeaderLink: Observable<string[]> = of(['']);

  constructor(private matDialog: MatDialog) {}

  public ngOnInit(): void {
    this.receiptHeaderLink = this.selectedGroupId.pipe(
      map((groupId) => [`/receipts/group/${groupId}`])
    );
  }

  public openSwitchGroupDialog(): void {
    this.matDialog.open(SwitchGroupDialogComponent, DEFAULT_DIALOG_CONFIG);
  }
}
