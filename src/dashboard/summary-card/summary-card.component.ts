import { switchMap, tap } from "rxjs";
import { GroupState } from "src/store/group.state";

import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Store } from "@ngxs/store";
import { UserService } from "@noah231515/receipt-wrangler-core";

@UntilDestroy()
@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss'],
})
export class SummaryCardComponent {
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private userService: UserService
  ) {}

  public usersOweMap: Map<string, string> = new Map();
  public userOwesMap: Map<string, string> = new Map();

  public ngOnInit(): void {
    this.listenForRouteChanges();
  }

  private listenForRouteChanges(): void {
    const groupId = this.store.selectSnapshot(GroupState.selectedGroupId);
    this.route.params
      .pipe(
        untilDestroyed(this),
        switchMap(() =>
          this.userService.getAmountOwedForUser(Number.parseInt(groupId))
        ),
        tap((result) => {
          this.userOwesMap = new Map();
          this.usersOweMap = new Map();

          Object.keys(result).forEach((k) => {
            const key = k.toString();
            if (Number(result[k]) > 0) {
              this.userOwesMap.set(key, result[k].toString());
            } else {
              this.usersOweMap.set(key, Math.abs(result[k]).toString());
            }
          });
        })
      )
      .subscribe();
  }
}
