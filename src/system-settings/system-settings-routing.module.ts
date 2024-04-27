import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormMode } from "../enums/form-mode.enum";
import { FormConfig } from "../interfaces";
import { SystemEmailTableComponent } from "./system-email-table/system-email-table.component";
import { SystemSettingsComponent } from "./system-settings/system-settings.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "system-email-table",
    pathMatch: "full",
  },
  {
    path: "",
    component: SystemSettingsComponent,
    children: [
      {
        path: "system-email-table",
        component: SystemEmailTableComponent,
        data: {
          formConfig: {
            mode: FormMode.view,
            headerText: "View System Emails",
          } as FormConfig,
        },
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingsRoutingModule {}
