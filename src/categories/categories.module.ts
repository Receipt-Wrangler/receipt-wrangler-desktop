import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { TableModule } from 'src/table/table.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { DirectivesModule } from '@receipt-wrangler/receipt-wrangler-core';

@NgModule({
  declarations: [CategoriesListComponent],
  imports: [
    TableModule,
    SharedUiModule,
    CommonModule,
    CategoriesRoutingModule,
    DirectivesModule,
  ],
})
export class CategoriesModule {}
