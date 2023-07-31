import { AutocomleteComponent } from 'src/autocomplete/autocomlete/autocomlete.component';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { User, UserState } from '@noah231515/receipt-wrangler-core';

@Component({
  selector: 'app-user-autocomplete',
  templateUrl: './user-autocomplete.component.html',
  styleUrls: ['./user-autocomplete.component.scss'],
})
export class UserAutocompleteComponent implements OnInit, OnChanges {
  constructor(private store: Store) {}

  @ViewChild(AutocomleteComponent)
  public autocompleteComponent!: AutocomleteComponent;

  @Input() public inputFormControl!: FormControl;

  @Input() public label = '';

  @Input() public multiple: boolean = false;

  @Input() public readonly: boolean = false;

  @Input() public usersToOmit: string[] = [];

  @Input() public optionValueKey?: string;

  public users: User[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['usersToOmit']) {
      this.filterUsers();
    }
  }

  public ngOnInit(): void {
    if (this.users.length === 0) {
      this.users = this.store.selectSnapshot(UserState.users);
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
