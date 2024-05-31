import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PipesModule } from "../pipes";
import { SelectModule } from "../select/select.module";
import { SharedUiModule } from "../shared-ui/shared-ui.module";
import { ImportFormComponent } from "./import-form/import-form.component";


@NgModule({
  declarations: [
    ImportFormComponent
  ],
  imports: [
    CommonModule,
    SharedUiModule,
    SelectModule,
    PipesModule
  ],
  exports: [
    ImportFormComponent
  ]
})
export class ImportModule {}
