import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/models/user';
import { UserState } from 'src/store/user.state';

@Component({
  selector: 'app-user-autocomplete',
  templateUrl: './user-autocomplete.component.html',
  styleUrls: ['./user-autocomplete.component.scss'],
})
export class UserAutocompleteComponent {
  constructor(private store: Store) {}

  @Select(UserState.users) public users!: Observable<User[]>;

  @Input() public inputFormControl!: FormControl;

  @Input() public label = '';

  @Input() public multiple: boolean = false;

  @Input() public readonly: boolean = false;

  public displayWith(id: number): string {
    const user = this.store.selectSnapshot(
      UserState.getUserById(id.toString())
    );

    if (user) {
      return user.displayName;
    }
    return '';
  }
}
