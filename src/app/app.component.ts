import { take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { EventType, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  AuthService,
  AuthState,
} from '@receipt-wrangler/receipt-wrangler-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'receipt-wrangler';

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.listenForNavigationStart();
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
