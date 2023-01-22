import { Component, OnInit } from '@angular/core';
import { EventType, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { switchMap, take, tap } from 'rxjs';
import { AuthService } from 'src/api/auth.service';
import { UsersService } from 'src/api/users.service';
import { AuthState } from 'src/store/auth.state';
import { SetAuthState } from 'src/store/auth.state.actions';
import { SetUsers } from 'src/store/user.state.actions';

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
    private userService: UsersService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.listenForNavigationStart();
    this.store.dispatch(new SetAuthState());
    const hasToken = this.store.selectSnapshot(AuthState.token);
    let isLoggedIn = this.store.selectSnapshot(AuthState.isLoggedIn);

    if (hasToken) {
      this.authService
        .getNewRefreshToken()
        .pipe(
          take(1),
          tap(() => {
            isLoggedIn = this.store.selectSnapshot(AuthState.isLoggedIn);
          }),
          switchMap(() => {
            return this.userService.getAllUsers().pipe(take(1));
          }),
          switchMap((users) => this.store.dispatch(new SetUsers(users)))
        )
        .subscribe();
    } else {
      this.userService
        .getAllUsers()
        .pipe(take(1))
        .subscribe((users) => {
          this.store.dispatch(new SetUsers(users));
        });
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
