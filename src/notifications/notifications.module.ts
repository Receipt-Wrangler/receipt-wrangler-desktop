import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';
import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { ButtonModule } from 'src/button/button.module';
import { MatListModule } from '@angular/material/list';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [NotificationsListComponent, NotificationComponent],
  imports: [CommonModule, ButtonModule, SharedUiModule, MatListModule],
  exports: [NotificationsListComponent],
})
export class NotificationsModule {}
