import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AuthState } from './auth.state';
import { UserState } from './user.state';
import { GroupState } from './group.state';
import { FeatureConfigState } from './feature-config.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { LayoutState } from './layout.state';
import { ReceiptTableState } from './receipt-table.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot([
      AuthState,
      FeatureConfigState,
      GroupState,
      LayoutState,
      ReceiptTableState,
      UserState,
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: true,
    }),
    NgxsStoragePluginModule.forRoot({
      key: ['groups', 'layout'],
    }),
  ],
})
export class StoreModule {}
