import { FormMode } from 'src/enums/form-mode.enum';
import { GroupRoleGuard } from 'src/guards/group-role.guard';
import { GroupGuard } from 'src/guards/group.guard';
import { CategoriesResolverService } from 'src/resolvers/categories-resolver.service';
import { ReceiptResolverService } from 'src/resolvers/receipt-resolver.service';
import { TagsResolverService } from 'src/resolvers/tags-resolver.service';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupMember } from '@receipt-wrangler/receipt-wrangler-core';

import { ReceiptFormComponent } from './receipt-form/receipt-form.component';
import { ReceiptsTableComponent } from './receipts-table/receipts-table.component';
import { receiptGuardGuard } from 'src/guards/receipt-guard.guard';

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
      groupRole: GroupMember.GroupRoleEnum.EDITOR,
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
      groupRole: GroupMember.GroupRoleEnum.VIEWER,
    },
    canActivate: [receiptGuardGuard],
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
      groupRole: GroupMember.GroupRoleEnum.EDITOR,
    },
    canActivate: [receiptGuardGuard],
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
