import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import {
  AuthState,
  FeatureConfigState,
  GroupState,
  UserState,
} from '@noah231515/receipt-wrangler-core';
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
      key: ['groups', 'layout', 'receiptTable'],
    }),
  ],
})
export class StoreModule {}
