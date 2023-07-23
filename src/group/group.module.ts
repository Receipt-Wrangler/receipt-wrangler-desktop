import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { ButtonModule } from '@noah231515/receipt-wrangler-core';
import { InputModule } from '@noah231515/receipt-wrangler-core';
import { PipesModule } from 'src/pipes/pipes.module';
import { SelectModule } from 'src/select/select.module';
import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { TableModule } from 'src/table/table.module';
import { UserAutocompleteModule } from 'src/user-autocomplete/user-autocomplete.module';
import { GroupFormComponent } from './group-form/group-form.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupMemberFormComponent } from './group-member-form/group-member-form.component';
import { GroupRoutingModule } from './group-routing.module';

@NgModule({
  declarations: [
    GroupListComponent,
    GroupFormComponent,
    GroupMemberFormComponent,
  ],
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
    TableModule,
  ],
  exports: [GroupListComponent],
})
export class GroupsModule {}
