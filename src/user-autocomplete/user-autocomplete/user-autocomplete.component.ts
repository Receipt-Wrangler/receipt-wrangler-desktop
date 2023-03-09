import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AutocomleteComponent } from 'src/autocomplete/autocomlete/autocomlete.component';
import { User } from 'src/models/user';
import { UserState } from 'src/store/user.state';

@Component({
  selector: 'app-user-autocomplete',
  templateUrl: './user-autocomplete.component.html',
  styleUrls: ['./user-autocomplete.component.scss'],
})
export class UserAutocompleteComponent implements OnChanges {
  constructor(private store: Store) {}

  @ViewChild(AutocomleteComponent)
  public autocompleteComponent!: AutocomleteComponent;

  @Input() public inputFormControl!: FormControl;

  @Input() public label = '';

  @Input() public multiple: boolean = false;

  @Input() public readonly: boolean = false;

  @Input() public usersToOmit: string[] = [];

  public users: User[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['usersToOmit']) {
      if (this.usersToOmit.length > 0) {
        this.filterUsers();
      } else {
        this.users = this.store.selectSnapshot(UserState.users);
      }
    }
  }

  private filterUsers(): void {
    this.users = this.store
      .selectSnapshot(UserState.users)
      .filter((u) => !this.usersToOmit.includes(u.id.toString()));
  }

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
