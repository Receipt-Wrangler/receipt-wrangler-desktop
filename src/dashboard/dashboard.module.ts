import { CheckboxModule } from "src/checkbox/checkbox.module";
import { PipesModule } from "src/pipes/pipes.module";
import { SharedUiModule } from "src/shared-ui/shared-ui.module";

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import {
  InputModule, PipesModule as CorePipesModule
} from "@receipt-wrangler/receipt-wrangler-core";

import { DashboardFormComponent } from "./dashboard-form/dashboard-form.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";

@NgModule({
  declarations: [DashboardComponent, DashboardFormComponent],
  imports: [
    CheckboxModule,
    CommonModule,
    CorePipesModule,
    DashboardRoutingModule,
    InputModule,
    MatCardModule,
    PipesModule,
    SharedUiModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
