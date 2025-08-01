import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/guards/auth.guard";
import { AuthResolver } from "src/guards/auth.resolver";
import { SidebarComponent } from "src/layout/sidebar/sidebar.component";
import { UserRole } from "../open-api";

// set up dashboard
const routes: Routes = [
  {
    path: "",
    component: SidebarComponent,
    children: [
      {
        path: "auth",
        loadChildren: () =>
          import("../auth").then(
            (m) => m.AuthModule
          ),
        canActivate: [AuthGuard],
        data: { animation: 'auth' }
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("../dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
        canActivate: [AuthGuard],
        resolve: { authState: AuthResolver },
        data: { animation: 'dashboard' }
      },
      {
        path: "categories",
        loadChildren: () =>
          import("../categories/categories.module").then(
            (m) => m.CategoriesModule
          ),
        canActivate: [AuthGuard],
        resolve: { authState: AuthResolver },
        data: { animation: 'categories' }
      },
      {
        path: "tags",
        loadChildren: () =>
          import("../tags/tags.module").then((m) => m.TagsModule),
        canActivate: [AuthGuard],
        resolve: { authState: AuthResolver },
        data: { animation: 'tags' }
      },
      {
        path: "custom-fields",
        loadChildren: () =>
          import("../custom-fields/custom-fields.module").then((m) => m.CustomFieldsModule),
        canActivate: [AuthGuard],
        resolve: { authState: AuthResolver },
        data: { animation: 'custom-fields' }
      },
      {
        path: "groups",
        loadChildren: () =>
          import("../group/group.module").then((m) => m.GroupsModule),
        canActivate: [AuthGuard],
        resolve: { authState: AuthResolver },
        data: { animation: 'groups' }
      },
      {
        path: "receipts",
        loadChildren: () =>
          import("../receipts/receipts.module").then((m) => m.ReceiptsModule),
        canActivate: [AuthGuard],
        resolve: { authState: AuthResolver },
        data: { animation: 'receipts' }
      },
      {
        path: "settings",
        loadChildren: () =>
          import("../settings/settings.module").then((m) => m.SettingsModule),
        canActivate: [AuthGuard],
        resolve: { authState: AuthResolver },
        data: { animation: 'settings' }
      },
      {
        path: "system-settings",
        loadChildren: () =>
          import("../system-settings/system-settings.module").then((m) => m.SystemSettingsModule),
        canActivate: [AuthGuard],
        resolve: { authState: AuthResolver },
        data: {
          role: UserRole.Admin,
          animation: 'system-settings'
        },
      },
      {
        path: "users",
        loadChildren: () =>
          import("../user/user.module").then((m) => m.UserModule),
        canActivate: [AuthGuard],
        resolve: { authState: AuthResolver },
        data: {
          role: UserRole.Admin,
          animation: 'users'
        },
      },
      {
        path: "",
        redirectTo: "/auth/login",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
