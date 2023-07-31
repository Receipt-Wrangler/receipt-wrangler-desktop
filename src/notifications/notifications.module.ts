import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '@noah231515/receipt-wrangler-core';
import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { NotificationComponent } from './notification/notification.component';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [NotificationsListComponent, NotificationComponent],
  imports: [
    ButtonModule,
    CommonModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
    SharedUiModule,
  ],
  exports: [NotificationsListComponent],
})
export class NotificationsModule {}
