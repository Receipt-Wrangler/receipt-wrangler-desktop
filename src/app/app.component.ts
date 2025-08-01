import { Component, OnInit } from "@angular/core";
import { EventType, Router, RouterOutlet } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Select, Store } from "@ngxs/store";
import { interval, take, tap, Observable } from "rxjs";
import { HideProgressBar } from "src/store/layout.state.actions";
import { fadeInOut, routeTransition } from "../animations";
import { AuthService, Claims } from "../open-api";
import { AuthState, SetAuthState } from "../store";
import { LayoutState } from "../store/layout.state";

@UntilDestroy()
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    animations: [fadeInOut, routeTransition],
    standalone: false
})
export class AppComponent implements OnInit {
  @Select(LayoutState.showAuthLoading) showAuthLoading$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(new HideProgressBar());
    this.listenForNavigationStart();
    this.refreshTokens();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  private refreshTokens(): void {
    const fifteenMinutes = 1000 * 60 * 15;
    interval(fifteenMinutes)
      .pipe(
        untilDestroyed(this),
        tap(() => {
          this.getNewRefreshToken();
        })
      ).subscribe();
  }

  private getNewRefreshToken(): void {
    if (this.store.selectSnapshot(AuthState.isLoggedIn)) {
      this.authService.getNewRefreshToken()
        .pipe
        (
          take(1),
          tap((response) => {
            this.store.dispatch(new SetAuthState(response as Claims));
          })
        )
        .subscribe();
    }
  }

  private listenForNavigationStart(): void {
    this.router.events.subscribe((e: any) => {
      if (e.type === EventType.NavigationStart) {
        const tokenExpired = this.store.selectSnapshot(
          AuthState.isTokenExpired
        );
        if (tokenExpired) {
          this.authService.getNewRefreshToken().pipe(take(1)).subscribe();
        }
      }
    });
  }
}
