import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CategoriesListComponent } from "./categories-list/categories-list.component";
import { CategoriesRoutingModule } from "./categories-routing.module";

@NgModule({
  declarations: [CategoriesListComponent],
  imports: [CommonModule, CategoriesRoutingModule],
})
export class CategoriesModule {}
