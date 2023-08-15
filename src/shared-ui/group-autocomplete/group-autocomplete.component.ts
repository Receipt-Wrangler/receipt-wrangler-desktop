import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Group, GroupState } from '@receipt-wrangler/receipt-wrangler-core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-group-autocomplete',
  templateUrl: './group-autocomplete.component.html',
  styleUrls: ['./group-autocomplete.component.scss'],
})
export class GroupAutocompleteComponent {
  @Input() public inputFormControl!: FormControl;

  @Input() public readonly: boolean = false;

  @Select(GroupState.groupsWithoutAll) public groups!: Observable<Group[]>;

  constructor(private store: Store) {}

  public groupDisplayWith(id: number): string {
    const group = this.store.selectSnapshot(
      GroupState.getGroupById(id?.toString())
    );

    if (group) {
      return group.name;
    }
    return '';
  }
}
