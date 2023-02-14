import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AuthState } from './auth.state';
import { UserState } from './user.state';
import { GroupState } from './group.state';
import { FeatureConfigState } from './feature-config.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot([AuthState, FeatureConfigState, GroupState, UserState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
})
export class StoreModule {}
