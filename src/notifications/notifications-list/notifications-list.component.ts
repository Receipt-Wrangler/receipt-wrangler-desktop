import { take, tap } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Notification, NotificationsService } from "@noah231515/receipt-wrangler-core";

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
      .getNotificationsForuser()
      .pipe(
        take(1),
        tap((notifications) => {
          this.notifications = notifications;
        })
      )
      .subscribe();
  }

  public deleteAllNotifications(): void {
    this.notificationsService
      .deleteAllNotificationsForUser()
      .pipe(
        take(1),
        tap(() => {
          this.notifications = [];
        })
      )
      .subscribe();
  }

  public notificationDeleted(id: number): void {
    this.notifications = this.notifications.filter((n) => n.id !== id);
  }
}
