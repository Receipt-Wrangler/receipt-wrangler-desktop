import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormMode } from "../enums/form-mode.enum";
import { FormConfig } from "../interfaces";
import { SystemEmailsComponent } from "./system-emails/system-emails.component";
import { SystemSettingsComponent } from "./system-settings/system-settings.component";

const routes: Routes = [
  {
    path: "",
    component: SystemSettingsComponent,
    children: [
      {
        path: "system-emails/view",
        component: SystemEmailsComponent,
        data: {
          formConfig: {
            mode: FormMode.view,
            headerText: "View System Emails",
          } as FormConfig,
        },
      },
    ]
  },
  {
    path: "",
    redirectTo: "system-emails/view",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingsRoutingModule {}
