import { switchMap, take, tap } from 'rxjs';

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import {
  GroupState,
  UserService,
} from '@receipt-wrangler/receipt-wrangler-core';

@UntilDestroy()
@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss'],
})
export class SummaryCardComponent implements OnChanges {
  constructor(private userService: UserService) {}

  @Input() public headerText: string = '';

  @Input() public groupId: string | number = '';

  @Input() public receiptIds: number[] = [];

  public usersOweMap: Map<string, string> = new Map();
  public userOwesMap: Map<string, string> = new Map();

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['groupId'] || changes['receiptIds']) {
      this.buildOweMap();
    }
  }

  private buildOweMap(): void {
    this.userService
      .getAmountOwedForUser(
        Number.parseInt(this.groupId as any) || (this.groupId as any),
        this.receiptIds
      )
      .pipe(
        take(1),
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