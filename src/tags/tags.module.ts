import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedUiModule } from "src/shared-ui/shared-ui.module";
import { TableModule } from "src/table/table.module";
import { DirectivesModule } from "../directives";
import { InputModule } from "../input";
import { PipesModule } from "../pipes";
import { TagsListComponent } from "./categories-list/tags-list.component";
import { TagFormComponent } from "./tag-form/tag-form.component";
import { TagsRoutingModule } from "./tags-routing.module";

@NgModule({
  declarations: [TagsListComponent, TagFormComponent],
  imports: [
    CommonModule,
    DirectivesModule,
    HttpClientModule,
    InputModule,
    PipesModule,
    ReactiveFormsModule,
    SharedUiModule,
    TableModule,
    TagsRoutingModule,
  ],
})
export class TagsModule {}
