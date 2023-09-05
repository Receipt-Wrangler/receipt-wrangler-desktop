import { FormMode } from 'src/enums/form-mode.enum';
import { GroupRoleGuard } from 'src/guards/group-role.guard';
import { FormConfig } from 'src/interfaces/form-config.interface';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupMember } from '@receipt-wrangler/receipt-wrangler-core';

import { GroupFormComponent } from './group-form/group-form.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupResolverService } from './resolvers/group-resolver.service';
import { GroupSettingsComponent } from './group-settings/group-settings.component';

const routes: Routes = [
  {
    path: '',
    component: GroupListComponent,
  },
  {
    path: 'create',
    component: GroupFormComponent,
    data: {
      formConfig: {
        mode: FormMode.add,
        headerText: 'Create Group',
      } as FormConfig,
    },
  },
  {
    path: ':id/view',
    component: GroupFormComponent,
    resolve: {
      group: GroupResolverService,
    },
    data: {
      formConfig: {
        mode: FormMode.view,
        headerText: 'View Group',
      } as FormConfig,
      groupRole: GroupMember.GroupRoleEnum.VIEWER,
    },
    canActivate: [GroupRoleGuard],
  },
  {
    path: ':id/edit',
    component: GroupFormComponent,
    resolve: {
      group: GroupResolverService,
    },
    data: {
      formConfig: {
        mode: FormMode.edit,
        headerText: 'Edit Group',
      } as FormConfig,
      groupRole: GroupMember.GroupRoleEnum.OWNER,
      useRouteGroupId: true,
    },
    canActivate: [GroupRoleGuard],
  },
  {
    path: ':id/settings/view',
    component: GroupSettingsComponent,
    resolve: {
      group: GroupResolverService,
    },
    data: {
      formConfig: {
        mode: FormMode.view,
        headerText: 'View Settings',
      } as FormConfig,
      groupRole: GroupMember.GroupRoleEnum.OWNER,
      useRouteGroupId: true,
    },
    canActivate: [GroupRoleGuard],
  },
  {
    path: ':id/settings/edit',
    component: GroupSettingsComponent,
    resolve: {
      group: GroupResolverService,
    },
    data: {
      formConfig: {
        mode: FormMode.edit,
        headerText: 'Edit Settings',
      } as FormConfig,
      groupRole: GroupMember.GroupRoleEnum.OWNER,
      useRouteGroupId: true,
    },
    canActivate: [GroupRoleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule {}
