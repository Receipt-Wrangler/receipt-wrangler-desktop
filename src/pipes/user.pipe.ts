import { Pipe, PipeTransform } from "@angular/core";
import { Store } from "@ngxs/store";
import { User } from "../open-api";
import { UserState } from "../store";

@Pipe({
  name: "user",
})
export class UserPipe implements PipeTransform {
  constructor(private store: Store) {}

  // TODO: fix user not showing up in comments
  public transform(userId?: string): User | undefined {
    return this.store.selectSnapshot(UserState.getUserById(userId ?? ""));
  }
}
