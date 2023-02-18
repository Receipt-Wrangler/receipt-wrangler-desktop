import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, take } from 'rxjs';
import { User } from 'src/models/user';
import { GroupState } from 'src/store/group.state';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient, private store: Store) {}

  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('/api/user').pipe(take(1));
  }

  public updateUser(id: string, user: User): Observable<void> {
    return this.httpClient.post<void>(`/api/user/${id}`, user);
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

  public setUserPassword(
    id: string,
    data: { password: string }
  ): Observable<void> {
    return this.httpClient.post<void>(`/api/user/${id}`, data);
  }
}
