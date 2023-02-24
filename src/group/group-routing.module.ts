import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/enums/form-mode.enum';
import { FormConfig } from 'src/interfaces/form-config.interface';
import { GroupFormComponent } from './group-form/group-form.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupResolverService } from './resolvers/group-resolver.service';

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
    },
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
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule {}
