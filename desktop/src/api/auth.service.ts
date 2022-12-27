import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  public signUp(data: {
    username: string;
    password: string;
    displayname: string;
  }): Observable<void> {
    return this.httpClient.post<void>('/api/signup', data).pipe(take(1));
  }
}
