import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private httpClient: HttpClient) {}

  public getNotifications(): Observable<Notification[]> {
    return this.httpClient.get<Notification[]>(`/api/notifications`);
  }
}
