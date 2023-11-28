import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupGuard } from 'src/guards/group.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardResolver } from './resolvers/dashboard.resolver';
const routes: Routes = [
  {
    path: 'group/:groupId',
    component: DashboardComponent,
    canActivate: [GroupGuard],
    data: {
      groupGuardBasePath: '/dashboard/group',
    },
    resolve: {
      dashboards: dashboardResolver,
    },
    children: [
      {
        path: ':dashboardId',
        component: DashboardComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'group/:groupId',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
