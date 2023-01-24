import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { map, Observable, of } from 'rxjs';
import { AuthState } from 'src/store/auth.state';
import { GroupState } from 'src/store/group.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Select(AuthState.isLoggedIn) public isLoggedIn!: Observable<boolean>;

  @Select(GroupState.selectedGroupId)
  public selectedGroupId!: Observable<boolean>;

  public receiptHeaderLink: Observable<string[]> = of(['']);

  public ngOnInit(): void {
    this.receiptHeaderLink = this.selectedGroupId.pipe(
      map((groupId) => [`/receipts/group/${groupId}`])
    );
  }
}
