import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupRoutingModule } from './group-routing.module';
import { GroupListComponent } from './group-list/group-list.component';
import { ButtonModule } from 'src/button/button.module';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [GroupListComponent],
  imports: [CommonModule, GroupRoutingModule, ButtonModule, MatTableModule],
  exports: [GroupListComponent],
})
export class GroupsModule {}
