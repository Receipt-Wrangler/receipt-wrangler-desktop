import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";
import { CheckboxModule } from "src/checkbox/checkbox.module";
import { PipesModule } from "src/pipes/pipes.module";
import { SelectModule } from "src/select/select.module";
import { SharedUiModule } from "src/shared-ui/shared-ui.module";
import { TableModule } from "src/table/table.module";
import { UserAutocompleteModule } from "src/user-autocomplete/user-autocomplete.module";
import { ButtonModule } from "../button";
import { InputModule } from "../input";
import { GroupFormComponent } from "./group-form/group-form.component";
import { GroupListComponent } from "./group-list/group-list.component";
import { GroupMemberFormComponent } from "./group-member-form/group-member-form.component";
import { GroupRoutingModule } from "./group-routing.module";
import { GroupSettingsEmailComponent } from "./group-settings-email/group-settings-email.component";
import { GroupSettingsComponent } from "./group-settings/group-settings.component";
import { GroupTabsComponent } from "./group-tabs/group-tabs.component";

@NgModule({
  declarations: [
    GroupListComponent,
    GroupFormComponent,
    GroupMemberFormComponent,
    GroupSettingsComponent,
    GroupSettingsEmailComponent,
    GroupTabsComponent,
  ],
  imports: [
    ButtonModule,
    CheckboxModule,
    CommonModule,
    PipesModule,
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
    TableModule,
    UserAutocompleteModule,
  ],
  exports: [GroupListComponent],
})
export class GroupsModule {}
