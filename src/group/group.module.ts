import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupRoutingModule } from './group-routing.module';
import { GroupListComponent } from './group-list/group-list.component';

@NgModule({
  declarations: [GroupListComponent],
  imports: [CommonModule, GroupRoutingModule],
  exports: [GroupListComponent],
})
export class GroupsModule {}
