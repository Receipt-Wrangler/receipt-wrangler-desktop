import { Component, OnInit } from '@angular/core';
import { take, tap } from 'rxjs';
import { NotificationsService } from 'src/api/notifications.service';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss'],
})
export class NotificationsListComponent implements OnInit {
  public notifications: Notification[] = [];

  constructor(private notificationsService: NotificationsService) {}

  public ngOnInit(): void {
    this.getNotifications();
  }

  private getNotifications(): void {
    this.notificationsService
      .getNotifications()
      .pipe(
        take(1),
        tap((notifications) => {
          this.notifications = notifications;
        })
      )
      .subscribe();
  }
}
