import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ButtonModule } from 'src/button/button.module';
import { InputModule } from 'src/input/input.module';
import { PipesModule } from 'src/pipes/pipes.module';
import { SelectModule } from 'src/select/select.module';
import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserListComponent, UserFormComponent],
  imports: [
    ButtonModule,
    CommonModule,
    InputModule,
    MatDialogModule,
    MatTableModule,
    PipesModule,
    ReactiveFormsModule,
    SelectModule,
    UserRoutingModule,
    SharedUiModule,
  ],
})
export class UserModule {}
