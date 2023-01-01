import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
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
    private userService: UsersService
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(new SetAuthState());
    const isTokenExpired = this.store.selectSnapshot(AuthState.isTokenExpired);
    const isLoggedIn = this.store.selectSnapshot(AuthState.isLoggedIn);

    if (isTokenExpired) {
      this.authService.getNewRefreshToken().subscribe();
    }

    if (isLoggedIn) {
      this.userService.getAllUsers().subscribe((users) => {
        this.store.dispatch(new SetUsers(users));
      });
    }
  }
}
