import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private httpClient: HttpClient) {}

  public getNotifications(): Observable<Notification[]> {
    return this.httpClient.get<Notification[]>(`/api/notifications`);
  }

  public deleteAllNotificationsForUser(): Observable<void> {
    return this.httpClient.delete<void>(`/api/notifications`);
  }
}
