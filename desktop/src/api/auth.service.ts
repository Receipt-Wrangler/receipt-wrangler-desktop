import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, take, tap } from 'rxjs';
import { Store } from '@ngxs/store';
import { SetAuthState } from 'src/store/auth.state.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private store: Store) {}

  public signUp(data: {
    username: string;
    password: string;
    displayname: string;
  }): Observable<void> {
    return this.httpClient.post<void>('/api/signup', data).pipe(take(1));
  }

  public login(data: { username: string; password: string }): Observable<void> {
    return this.httpClient.post<void>('api/login', data).pipe(take(1));
  }

  public getNewRefreshToken(): Observable<void> {
    return this.refreshToken().pipe(
      switchMap(() => this.store.dispatch(new SetAuthState()))
    );
  }

  private refreshToken(): Observable<void> {
    return this.httpClient.post<void>('api/token', {}).pipe(take(1));
  }
}
