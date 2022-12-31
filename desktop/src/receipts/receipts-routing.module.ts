import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesResolverService } from 'src/resolvers/categories-resolver.service';
import { TagsResolverService } from 'src/resolvers/tags-resolver.service';
import { ReceiptFormComponent } from './receipt-form/receipt-form.component';
import { ReceiptsTableComponent } from './receipts-table/receipts-table.component';
const routes: Routes = [
  {
    path: '',
    component: ReceiptsTableComponent,
  },
  {
    path: 'add',
    component: ReceiptFormComponent,
    resolve: {
      tags: TagsResolverService,
      categories: CategoriesResolverService,
    },
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiptsRoutingModule {}
