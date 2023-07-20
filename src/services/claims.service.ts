import { Observable, switchMap, take } from "rxjs";
import { SetAuthState } from "src/store/auth.state.actions";

import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { UserService } from "@noah231515/receipt-wrangler-core";

@Injectable({
  providedIn: 'root',
})
export class ClaimsService {
  constructor(private store: Store, private userService: UserService) {}

  public getAndSetClaimsForLoggedInUser(): Observable<void> {
    return this.userService.getUserClaims().pipe(
      take(1),
      switchMap((claims) => this.store.dispatch(new SetAuthState(claims)))
    );
  }
}
