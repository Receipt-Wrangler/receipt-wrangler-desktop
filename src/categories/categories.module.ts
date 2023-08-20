import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { TableModule } from 'src/table/table.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import {
  DirectivesModule,
  InputModule,
  PipesModule,
} from '@receipt-wrangler/receipt-wrangler-core';
import { EditCategoryDialogComponent } from './edit-category-dialog/edit-category-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoriesListComponent, EditCategoryDialogComponent],
  imports: [
    CategoriesRoutingModule,
    CommonModule,
    DirectivesModule,
    InputModule,
    PipesModule,
    ReactiveFormsModule,
    SharedUiModule,
    TableModule,
  ],
})
export class CategoriesModule {}
