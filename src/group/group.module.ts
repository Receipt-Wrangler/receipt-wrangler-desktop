import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { ButtonModule } from 'src/button/button.module';
import { InputModule } from 'src/input/input.module';
import { PipesModule } from 'src/pipes/pipes.module';
import { SelectModule } from 'src/select/select.module';
import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { UserAutocompleteModule } from 'src/user-autocomplete/user-autocomplete.module';
import { CreateGroupFormComponent } from './create-group-form/create-group-form.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupRoutingModule } from './group-routing.module';
import { GroupMemberFormComponent } from './group-member-form/group-member-form.component';

@NgModule({
  declarations: [GroupListComponent, CreateGroupFormComponent, GroupMemberFormComponent],
  imports: [
    ButtonModule,
    CommonModule,
    GroupRoutingModule,
    InputModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
    MatTableModule,
    PipesModule,
    ReactiveFormsModule,
    SelectModule,
    SharedUiModule,
    UserAutocompleteModule,
  ],
  exports: [GroupListComponent],
})
export class GroupsModule {}
