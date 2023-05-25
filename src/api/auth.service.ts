import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private userService: UsersService
  ) {}

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

  public logout(): Observable<void> {
    return this.httpClient.post<void>('api/logout', {}).pipe();
  }

  public getNewRefreshToken(): Observable<void> {
    return this.refreshToken().pipe(
      switchMap(() => this.userService.getAndSetClaimsForLoggedInUser())
    );
  }

  private refreshToken(): Observable<void> {
    return this.httpClient.post<void>('api/token', {}).pipe(take(1));
  }
}
