import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';



@NgModule({
  declarations: [
    NotificationsListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NotificationsListComponent
  ]
})
export class NotificationsModule { }
