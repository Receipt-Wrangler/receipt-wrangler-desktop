import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRole } from 'src/enums/user_role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
// set up dashboard
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'receipts',
    loadChildren: () =>
      import('../receipts/receipts.module').then((m) => m.ReceiptsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () => import('../user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuard],
    data: {
      role: UserRole.ADMIN,
    },
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
