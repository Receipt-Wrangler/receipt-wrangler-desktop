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
} from '@receipt-wrangler/receipt-wrangler-core';
import { LayoutState } from './layout.state';
import { ReceiptTableState } from './receipt-table.state';
import { CategoryTableState } from './category-table.state';
import { environment } from 'src/environments/environment.development';
import { TagsTableState } from './tags-table.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot([
      AuthState,
      CategoryTableState,
      FeatureConfigState,
      GroupState,
      LayoutState,
      ReceiptTableState,
      TagsTableState,
      UserState,
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.isProd,
    }),
    NgxsStoragePluginModule.forRoot({
      key: ['groups', 'layout', 'receiptTable', 'categoryTable'],
    }),
  ],
})
export class StoreModule {}
