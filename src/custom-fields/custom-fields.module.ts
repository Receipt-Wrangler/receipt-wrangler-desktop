import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedUiModule } from "../shared-ui/shared-ui.module";
import { TableModule } from "../table/table.module";
import { CustomFieldTableComponent } from "./custom-field-table/custom-field-table.component";

import { CustomFieldsRoutingModule } from "./custom-fields-routing.module";
import { CustomFieldTypePipe } from "./pipes/custom-field-type.pipe";
import { CustomFieldFormComponent } from './custom-field-form/custom-field-form.component';


@NgModule({
  declarations: [
    CustomFieldTypePipe,
    CustomFieldTableComponent,
    CustomFieldFormComponent
  ],
  imports: [
    CommonModule,
    CustomFieldsRoutingModule,
    SharedUiModule, TableModule
  ]
})
export class CustomFieldsModule {}
