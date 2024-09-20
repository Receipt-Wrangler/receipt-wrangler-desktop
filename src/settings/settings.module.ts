import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ColorPickerModule } from "src/color-picker/color-picker.module";
import { PipesModule } from "src/pipes/pipes.module";
import { SharedUiModule } from "src/shared-ui/shared-ui.module";
import { UserAutocompleteModule } from "src/user-autocomplete/user-autocomplete.module";
import { AutocompleteModule } from "../autocomplete/autocomplete.module";
import { CheckboxModule } from "../checkbox/checkbox.module";
import { DirectivesModule } from "../directives";
import { InputModule } from "../input";
import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings/settings.component";
import { UserPreferencesComponent } from "./user-preferences/user-preferences.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { UserShortcutComponent } from './user-shortcut/user-shortcut.component';

@NgModule({
  declarations: [
    SettingsComponent,
    UserProfileComponent,
    UserPreferencesComponent,
    UserShortcutComponent,
  ],
  imports: [
    ColorPickerModule,
    CommonModule,
    DirectivesModule,
    InputModule,
    MatTabsModule,
    MatTooltipModule,
    PipesModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    SharedUiModule,
    UserAutocompleteModule,
    CheckboxModule,
    MatListModule,
    AutocompleteModule,
    MatIconModule,
  ],
})
export class SettingsModule {}
