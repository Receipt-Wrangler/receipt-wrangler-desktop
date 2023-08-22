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
import { CategoryForm } from './category-form/category-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DuplicateValidator } from 'src/validators/duplicate-validator';

@NgModule({
  declarations: [CategoriesListComponent, CategoryForm],
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
  providers: [DuplicateValidator],
})
export class CategoriesModule {}
