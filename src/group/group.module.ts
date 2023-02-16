import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupRoutingModule } from './group-routing.module';
import { GroupListComponent } from './group-list/group-list.component';
import { ButtonModule } from 'src/button/button.module';
import { MatTableModule } from '@angular/material/table';
import { CreateGroupFormComponent } from './create-group-form/create-group-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputModule } from 'src/input/input.module';
import { PipesModule } from 'src/pipes/pipes.module';
import { SharedUiModule } from 'src/shared-ui/shared-ui.module';

@NgModule({
  declarations: [GroupListComponent, CreateGroupFormComponent],
  imports: [
    ButtonModule,
    CommonModule,
    GroupRoutingModule,
    InputModule,
    MatDialogModule,
    MatTableModule,
    PipesModule,
    ReactiveFormsModule,
    SharedUiModule,
  ],
  exports: [GroupListComponent],
})
export class GroupsModule {}
