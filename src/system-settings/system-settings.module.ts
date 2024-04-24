import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "../button";
import { SharedUiModule } from "../shared-ui/shared-ui.module";
import { TableModule } from "../table/table.module";
import { SystemEmailsComponent } from "./system-emails/system-emails.component";

import { SystemSettingsRoutingModule } from "./system-settings-routing.module";
import { SystemSettingsComponent } from "./system-settings/system-settings.component";


@NgModule({
  declarations: [SystemEmailsComponent, SystemSettingsComponent],
  imports: [
    CommonModule,
    SystemSettingsRoutingModule,
    TableModule,
    ButtonModule,
    SharedUiModule
  ]
})
export class SystemSettingsModule {}
