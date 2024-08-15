import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatListModule } from "@angular/material/list";
import { CheckboxModule } from "src/checkbox/checkbox.module";
import { PipesModule } from "src/pipes/pipes.module";
import { SharedUiModule } from "src/shared-ui/shared-ui.module";
import { ButtonModule } from "../button/index";
import { InputModule } from "../input";
import { SelectModule } from "../select/select.module";
import { DashboardFormComponent } from "./dashboard-form/dashboard-form.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FilteredReceiptsComponent } from "./filtered-receipts/filtered-receipts.component";
import { GroupDashboardsComponent } from "./group-dashboards/group-dashboards.component";
import { WidgetTypePipe } from "./widget-type.pipe";

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardFormComponent,
    GroupDashboardsComponent,
    FilteredReceiptsComponent,
    WidgetTypePipe,
  ],
  imports: [
    CheckboxModule,
    CommonModule,
    DashboardRoutingModule,
    InputModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    PipesModule,
    PipesModule,
    ReactiveFormsModule,
    ScrollingModule,
    SharedUiModule,
    ButtonModule,
    SelectModule,
  ],
  exports: [
    WidgetTypePipe
  ],
})
export class DashboardModule {}
