import { User } from "src/api";
import { UserState } from "src/store/user.state";

import { Pipe, PipeTransform } from "@angular/core";
import { Store } from "@ngxs/store";

@Pipe({
  name: 'user',
})
export class UserPipe implements PipeTransform {
  constructor(private store: Store) {}

  public transform(userId?: string): User | undefined {
    return this.store.selectSnapshot(UserState.getUserById(userId ?? ''));
  }
}
