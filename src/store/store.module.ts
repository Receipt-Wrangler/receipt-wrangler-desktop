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
import { TagTableState } from './tag-table.state';
import { DashboardState } from './dashboard.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot([
      AuthState,
      CategoryTableState,
      DashboardState,
      FeatureConfigState,
      GroupState,
      LayoutState,
      ReceiptTableState,
      TagTableState,
      UserState,
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.isProd,
    }),
    NgxsStoragePluginModule.forRoot({
      key: [
        'auth',
        'categoryTable',
        'dashboards',
        'groups',
        'layout',
        'receiptTable',
      ],
    }),
  ],
})
export class StoreModule {}
