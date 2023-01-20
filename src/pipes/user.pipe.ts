import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { User } from 'src/models/user';
import { UserState } from 'src/store/user.state';

@Pipe({
  name: 'user',
})
export class UserPipe implements PipeTransform {
  constructor(private store: Store) {}

  public transform(userId: string): User | undefined {
    return this.store.selectSnapshot(UserState.getUserById(userId));
  }
}
