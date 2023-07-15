import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, switchMap, take } from 'rxjs';
import { SetAuthState } from 'src/store/auth.state.actions';
import { GroupState } from 'src/store/group.state';
import { AuthStateInterface } from '../interfaces';
import { UpdateUserProfileCommand } from './commands/update-user-profile-command';
import { User } from 'src/api-new';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient, private store: Store) {}

  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('/api/user').pipe(take(1));
  }

  public getClaimsForLoggedInUser(): Observable<AuthStateInterface> {
    return this.httpClient.get<AuthStateInterface>('/api/user/getUserClaims');
  }

  public getAndSetClaimsForLoggedInUser(): Observable<void> {
    return this.getClaimsForLoggedInUser().pipe(
      take(1),
      switchMap((claims) => this.store.dispatch(new SetAuthState(claims)))
    );
  }

  public updateUser(id: string, user: User): Observable<void> {
    return this.httpClient.put<void>(`/api/user/${id}`, user);
  }

  public createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`/api/user`, user);
  }

  public getUsernameCount(username: string): Observable<number> {
    return this.httpClient.get<number>(`/api/user/${username}`);
  }

  public geAmountOwedForUser(): Observable<any> {
    const selectedGroupId = this.store.selectSnapshot(
      GroupState.selectedGroupId
    );
    return this.httpClient.get<any>(
      `/api/user/amountOwedForUser/${selectedGroupId}`
    );
  }

  public deleteUser(userId: string): Observable<void> {
    return this.httpClient.delete<void>(`/api/user/${userId}`);
  }

  public setUserPassword(
    id: string,
    data: { password: string }
  ): Observable<void> {
    return this.httpClient.post<void>(`/api/user/${id}/resetPassword`, data);
  }

  public convertDummyUserToNormalUser(
    id: string,
    data: { password: string }
  ): Observable<void> {
    return this.httpClient.post<void>(
      `/api/user/${id}/convertDummyUserToNormaluser`,
      data
    );
  }

  public updateUserProfile(
    command: UpdateUserProfileCommand
  ): Observable<void> {
    return this.httpClient.put<void>(`/api/user/updateUserProfile`, command);
  }
}
