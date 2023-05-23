import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [SettingsComponent, UserProfileComponent],
  imports: [CommonModule, SettingsRoutingModule, MatTabsModule],
})
export class SettingsModule {}
