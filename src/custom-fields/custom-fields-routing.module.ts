import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedUiModule } from "../shared-ui/shared-ui.module";
import { TableModule } from "../table/table.module";
import { CustomFieldTableComponent } from "./custom-field-table/custom-field-table.component";

const routes: Routes = [
  {
    path: "",
    component: CustomFieldTableComponent,
  },
  {
    path: "",
    redirectTo: "custom-fields",
    pathMatch: "full",
  },
];

@NgModule({
  declarations: [CustomFieldTableComponent],
  imports: [RouterModule.forChild(routes), SharedUiModule, TableModule],
  exports: [RouterModule]
})
export class CustomFieldsRoutingModule {}
