import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [UserListComponent],
  imports: [CommonModule, MatTableModule, UserRoutingModule],
})
export class UserModule {}
