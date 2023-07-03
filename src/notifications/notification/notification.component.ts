import { Component, Input } from '@angular/core';
import { Notification } from '../../models/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  @Input() public notification!: Notification;

  public deleteNotification(): void {
    console.warn('hello world');
  }
}
