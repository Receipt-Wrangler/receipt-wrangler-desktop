import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatTooltip } from "@angular/material/tooltip";
import { RouterLink } from "@angular/router";
import { AutocompleteModule } from "../autocomplete/autocomplete.module";
import { ButtonModule } from "../button";
import { InputModule } from "../input";
import { PipesModule } from "../pipes";
import { SelectModule } from "../select/select.module";
import { SharedUiModule } from "../shared-ui/shared-ui.module";
import { TableModule } from "../table/table.module";
import { AiTypePipe } from "./pipes/ai-type.pipe";
import { OcrEnginePipe } from "./pipes/ocr-engine.pipe";
import { ReceiptProcessingSettingsFormComponent } from "./receipt-processing-settings-form/receipt-processing-settings-form.component";
import { ReceiptProcessingSettingsTableComponent } from "./receipt-processing-settings-table/receipt-processing-settings-table.component";


@NgModule({
  declarations: [ReceiptProcessingSettingsTableComponent, ReceiptProcessingSettingsFormComponent],
  imports: [
    CommonModule,
    TableModule,
    SharedUiModule,
    RouterLink,
    ReactiveFormsModule,
    InputModule,
    PipesModule,
    SelectModule,
    AutocompleteModule,
    AiTypePipe,
    OcrEnginePipe,
    ButtonModule,
    MatTooltip
  ],
  exports: []
})
export class ReceiptProcessingSettingsModule {}
