import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthService } from 'src/api/auth.service';
import { AuthState } from 'src/store/auth.state';
import { SetAuthState } from 'src/store/auth.state.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'receipt-wrangler';
  constructor(private store: Store, private authService: AuthService) {}
  public ngOnInit(): void {
    this.store.dispatch(new SetAuthState());
    const isTokenExpired = this.store.selectSnapshot(AuthState.isTokenExpired);

    if (isTokenExpired) {
      this.authService.getNewRefreshToken().subscribe();
    }
  }
}
