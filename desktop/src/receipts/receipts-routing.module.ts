import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guards/auth.guard';
import { ReceiptsTableComponent } from './receipts-table/receipts-table.component';
const routes: Routes = [
  {
    path: '',
    component: ReceiptsTableComponent,
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
