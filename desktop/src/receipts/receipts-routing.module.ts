import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
