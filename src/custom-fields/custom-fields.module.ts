import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { InputModule } from "../input/index";
import { PipesModule } from "../pipes/index";
import { SelectModule } from "../select/select.module";
import { SharedUiModule } from "../shared-ui/shared-ui.module";
import { TableModule } from "../table/table.module";
import { CustomFieldFormComponent } from "./custom-field-form/custom-field-form.component";
import { CustomFieldTableComponent } from "./custom-field-table/custom-field-table.component";

import { CustomFieldsRoutingModule } from "./custom-fields-routing.module";
import { CustomFieldTypePipe } from "./pipes/custom-field-type.pipe";


@NgModule({
  declarations: [
    CustomFieldTypePipe,
    CustomFieldTableComponent,
    CustomFieldFormComponent
  ],
  imports: [
    CommonModule,
    CustomFieldsRoutingModule,
    SharedUiModule, TableModule, ReactiveFormsModule, InputModule, PipesModule, SelectModule
  ]
})
export class CustomFieldsModule {}
