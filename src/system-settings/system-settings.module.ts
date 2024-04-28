import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "../button";
import { InputModule } from "../input";
import { PipesModule } from "../pipes";
import { SharedUiModule } from "../shared-ui/shared-ui.module";
import { TableModule } from "../table/table.module";
import { SystemEmailFormComponent } from "./system-email-form/system-email-form.component";
import { SystemEmailTableComponent } from "./system-email-table/system-email-table.component";

import { SystemSettingsRoutingModule } from "./system-settings-routing.module";
import { SystemSettingsComponent } from "./system-settings/system-settings.component";


@NgModule({
  declarations: [SystemEmailTableComponent, SystemSettingsComponent, SystemEmailFormComponent],
  imports: [
    CommonModule,
    SystemSettingsRoutingModule,
    TableModule,
    ButtonModule,
    SharedUiModule,
    ReactiveFormsModule,
    InputModule,
    PipesModule
  ]
})
export class SystemSettingsModule {}
