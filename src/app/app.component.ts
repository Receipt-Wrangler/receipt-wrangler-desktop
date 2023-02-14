import { Component, OnInit } from '@angular/core';
import { EventType, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { take } from 'rxjs';
import { AuthService } from 'src/api/auth.service';
import { AuthState } from 'src/store/auth.state';
import { SetFeatureConfig } from 'src/store/feature-config.state.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'receipt-wrangler';

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(new SetFeatureConfig());
    this.listenForNavigationStart();
  }

  private listenForNavigationStart(): void {
    this.router.events.subscribe((e: any) => {
      if (e.type === EventType.NavigationStart) {
        const tokenExpired =
          this.store.selectSnapshot(AuthState.isTokenExpired) &&
          !!this.store.selectSnapshot(AuthState.token);
        if (tokenExpired) {
          this.authService.getNewRefreshToken().pipe(take(1)).subscribe();
        }
      }
    });
  }
}
