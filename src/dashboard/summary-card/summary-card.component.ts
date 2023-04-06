import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { take, tap } from 'rxjs';
import { UsersService } from 'src/api/users.service';

@UntilDestroy()
@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss'],
})
export class SummaryCardComponent {
  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {}

  public usersOweMap: Map<string, string> = new Map();
  public userOwesMap: Map<string, string> = new Map();

  public ngOnInit(): void {
    this.listenForRouteChanges();
  }

  private listenForRouteChanges(): void {
    this.route.params
      .pipe(
        untilDestroyed(this),
        tap(() => {
          this.usersService
            .geAmountOwedForUser()
            .pipe(
              tap((result) => {
                this.userOwesMap = new Map();
                this.userOwesMap = new Map();

                Object.keys(result).forEach((k) => {
                  const key = k.toString();
                  if (Number(result[k]) > 0) {
                    this.userOwesMap.set(key, result[k].toString());
                  } else {
                    this.usersOweMap.set(key, result[k].toString());
                  }
                });
              })
            )
            .subscribe();
        })
      )
      .subscribe();
  }
}
