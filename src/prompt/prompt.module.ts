import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "../button";
import { InputModule } from "../input";
import { PipesModule } from "../pipes";
import { SharedUiModule } from "../shared-ui/shared-ui.module";
import { TableModule } from "../table/table.module";

import { PromptRoutingModule } from "./prompt-routing.module";
import { PromptTableComponent } from "./prompt-table/prompt-table.component";


@NgModule({
  declarations: [
    PromptTableComponent
  ],
  imports: [
    CommonModule,
    PromptRoutingModule,
    SharedUiModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    InputModule,
    PipesModule,
  ]
})
export class PromptModule {}
