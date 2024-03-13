import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormMode } from "src/enums/form-mode.enum";
import { GroupRoleGuard } from "src/guards/group-role.guard";
import { FormConfig } from "src/interfaces/form-config.interface";
import { GroupRole } from "../api";
import { GroupFormComponent } from "./group-form/group-form.component";
import { GroupListComponent } from "./group-list/group-list.component";
import { GroupSettingsComponent } from "./group-settings/group-settings.component";
import { GroupTabsComponent } from "./group-tabs/group-tabs.component";
import { GroupResolverService } from "./resolvers/group-resolver.service";

const routes: Routes = [
  {
    path: "",
    component: GroupListComponent,
  },
  {
    path: "create",
    component: GroupFormComponent,
    data: {
      formConfig: {
        mode: FormMode.add,
        headerText: "Create Group",
      } as FormConfig,
    },
  },
  {
    path: ":id",
    component: GroupTabsComponent,
    resolve: {
      group: GroupResolverService,
    },
    data: {
      formConfig: {
        mode: FormMode.view,
        headerText: "View Group",
      } as FormConfig,
      groupRole: GroupRole.VIEWER,
    },
    canActivate: [GroupRoleGuard],
    children: [
      {
        path: "details/view",
        component: GroupFormComponent,
        resolve: {
          group: GroupResolverService,
        },
        data: {
          formConfig: {
            mode: FormMode.view,
            headerText: "View Group",
          } as FormConfig,
          groupRole: GroupRole.VIEWER,
          entityType: "Details",
          setHeaderText: true,
        },
        canActivate: [GroupRoleGuard],
      },
      {
        path: "details/edit",
        component: GroupFormComponent,
        resolve: {
          group: GroupResolverService,
        },
        data: {
          formConfig: {
            mode: FormMode.edit,
          } as FormConfig,
          groupRole: GroupRole.OWNER,
          entityType: "Details",
          setHeaderText: true,
        },
        canActivate: [GroupRoleGuard],
      },
      {
        path: "settings/view",
        component: GroupSettingsComponent,
        resolve: {
          group: GroupResolverService,
        },
        data: {
          formConfig: {
            mode: FormMode.view,
          } as FormConfig,
          setHeaderText: true,
          entityType: "Settings",
          groupRole: GroupRole.OWNER,
        },
        canActivate: [GroupRoleGuard],
      },
      {
        path: "settings/edit",
        component: GroupSettingsComponent,
        resolve: {
          group: GroupResolverService,
        },
        data: {
          formConfig: {
            mode: FormMode.edit,
          } as FormConfig,
          setHeaderText: true,
          entityType: "Settings",
          groupRole: GroupRole.OWNER,
        },
        canActivate: [GroupRoleGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule {}
