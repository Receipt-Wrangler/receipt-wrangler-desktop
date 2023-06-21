import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/enums/form-mode.enum';
import { GroupRole } from 'src/enums/group-role.enum';
import { GroupRoleGuard } from 'src/guards/group-role.guard';
import { GroupGuard } from 'src/guards/group.guard';
import { CategoriesResolverService } from 'src/resolvers/categories-resolver.service';
import { ReceiptResolverService } from 'src/resolvers/receipt-resolver.service';
import { TagsResolverService } from 'src/resolvers/tags-resolver.service';
import { ReceiptFormComponent } from './receipt-form/receipt-form.component';
import { ReceiptsTableComponent } from './receipts-table/receipts-table.component';

const routes: Routes = [
  {
    path: 'group/:groupId',
    component: ReceiptsTableComponent,
    canActivate: [GroupGuard],
    resolve: {
      tags: TagsResolverService,
      categories: CategoriesResolverService,
    },
    data: {
      groupGuardBasePath: `/receipts/group`,
    },
  },
  {
    path: 'add',
    component: ReceiptFormComponent,
    resolve: {
      tags: TagsResolverService,
      categories: CategoriesResolverService,
    },
    data: {
      mode: FormMode.add,
      groupRole: GroupRole.EDITOR,
    },
    canActivate: [GroupRoleGuard],
  },
  {
    path: ':id/view',
    component: ReceiptFormComponent,
    resolve: {
      tags: TagsResolverService,
      categories: CategoriesResolverService,
      receipt: ReceiptResolverService,
    },
    data: {
      mode: FormMode.view,
      groupRole: GroupRole.VIEWER,
    },
    canActivate: [GroupRoleGuard],
  },
  {
    path: ':id/edit',
    component: ReceiptFormComponent,
    resolve: {
      tags: TagsResolverService,
      categories: CategoriesResolverService,
      receipt: ReceiptResolverService,
    },
    data: {
      mode: FormMode.edit,
      groupRole: GroupRole.EDITOR,
    },
    canActivate: [GroupRoleGuard],
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
