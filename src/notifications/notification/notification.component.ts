import { Component, EventEmitter, Input, Output } from '@angular/core';
import { take, tap } from 'rxjs';
import { NotificationsService } from 'src/api/notifications.service';
import { Notification } from '../../models/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  @Input() public notification!: Notification;

  @Output() public notificationDeleted: EventEmitter<number> =
    new EventEmitter<number>(undefined);

  constructor(private notificationsService: NotificationsService) {}

  public deleteNotification(): void {
    this.notificationsService
      .deleteNotificationById(this.notification.id)
      .pipe(
        take(1),
        tap(() => {
          this.notificationDeleted.emit(this.notification.id);
        })
      )
      .subscribe();
  }
}
