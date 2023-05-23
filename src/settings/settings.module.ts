import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { InputModule } from 'src/input/input.module';
import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/pipes/pipes.module';

@NgModule({
  declarations: [SettingsComponent, UserProfileComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatTabsModule,
    InputModule,
    SharedUiModule,
    ReactiveFormsModule,
    PipesModule,
  ],
})
export class SettingsModule {}
