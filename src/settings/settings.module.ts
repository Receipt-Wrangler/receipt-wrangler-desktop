import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ColorPickerModule } from 'src/color-picker/color-picker.module';
import { InputModule } from 'src/input/input.module';
import { PipesModule } from 'src/pipes/pipes.module';
import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [SettingsComponent, UserProfileComponent],
  imports: [
    ColorPickerModule,
    CommonModule,
    InputModule,
    MatTabsModule,
    MatTooltipModule,
    PipesModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    SharedUiModule,
  ],
})
export class SettingsModule {}
