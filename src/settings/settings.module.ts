import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ColorPickerModule } from 'src/color-picker/color-picker.module';
import {
  InputModule,
  PipesModule as CorePipesModule,
  DirectivesModule,
} from '@receipt-wrangler/receipt-wrangler-core';
import { PipesModule } from 'src/pipes/pipes.module';
import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserPreferencesComponent } from './user-preferences/user-preferences.component';
import { UserAutocompleteModule } from 'src/user-autocomplete/user-autocomplete.module';

@NgModule({
  declarations: [
    SettingsComponent,
    UserProfileComponent,
    UserPreferencesComponent,
  ],
  imports: [
    ColorPickerModule,
    CommonModule,
    CorePipesModule,
    DirectivesModule,
    InputModule,
    MatTabsModule,
    MatTooltipModule,
    PipesModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    SharedUiModule,
    UserAutocompleteModule,
  ],
})
export class SettingsModule {}
