import { take, tap } from "rxjs";
import { ParameterizedDataParser } from "src/utils";

import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Notification, NotificationsService } from "@noah231515/receipt-wrangler-core";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @Input() public notification!: Notification;

  @Output() public notificationDeleted: EventEmitter<number> =
    new EventEmitter<number>(undefined);

  public link?: string;

  public parsedBody: string = '';

  constructor(
    private notificationsService: NotificationsService,
    private parameterizedDataParser: ParameterizedDataParser
  ) {}

  public ngOnInit(): void {
    this.parseBody();
  }

  private parseBody(): void {
    this.parsedBody = this.parameterizedDataParser.parse(
      this.notification.body
    );
    this.link = this.parameterizedDataParser.link;
  }

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
