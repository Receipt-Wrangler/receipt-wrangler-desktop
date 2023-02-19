import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guards/auth.guard';
import { GroupGuard } from 'src/guards/group.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  {
    path: 'group/:groupId',
    component: DashboardComponent,
    canActivate: [GroupGuard],
    data: {
      groupGuardBasePath: '/dashboard/group',
    },
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
