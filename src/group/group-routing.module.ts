import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/enums/form-mode.enum';
import { FormConfig } from 'src/interfaces/form-config.interface';
import { CreateGroupFormComponent } from './create-group-form/create-group-form.component';
import { GroupListComponent } from './group-list/group-list.component';

const routes: Routes = [
  {
    path: '',
    component: GroupListComponent,
  },
  {
    path: 'create',
    component: CreateGroupFormComponent,
    data: {
      formConfig: {
        mode: FormMode.view,
        headerText: 'Create Group',
      } as FormConfig,
    },
  },
  {
    path: ':id/view',
    component: CreateGroupFormComponent,
    data: {
      formConfig: {
        mode: FormMode.view,
        headerText: 'Update Group',
      } as FormConfig,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule {}
