import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { take, switchMap, tap, Observable } from 'rxjs';
import { AuthService } from 'src/api/auth.service';
import { User } from 'src/models';
import { SnackbarService } from 'src/services/snackbar.service';
import { AuthState } from 'src/store/auth.state';
import { Logout } from 'src/store/auth.state.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  @Select(AuthState.loggedInUser) public loggedInUser!: Observable<User>;

  @Select(AuthState.isLoggedIn) public isLoggedIn!: Observable<boolean>;

  public logout(): void {
    this.authService
      .logout()
      .pipe(
        take(1),
        switchMap(() => this.store.dispatch(new Logout())),
        switchMap(() => this.router.navigate(['/'])),
        tap(() => this.snackbarService.success('Successfully logged out'))
      )
      .subscribe();
  }
}