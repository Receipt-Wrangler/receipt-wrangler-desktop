import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterLink } from "@angular/router";
import { SharedUiModule } from "../shared-ui/shared-ui.module";
import { TableModule } from "../table/table.module";
import { ReceiptProcessingSettingsFormComponent } from "./receipt-processing-settings-form/receipt-processing-settings-form.component";
import { ReceiptProcessingSettingsTableComponent } from "./receipt-processing-settings-table/receipt-processing-settings-table.component";


@NgModule({
  declarations: [ReceiptProcessingSettingsTableComponent, ReceiptProcessingSettingsFormComponent],
  imports: [
    CommonModule,
    TableModule,
    SharedUiModule,
    RouterLink
  ],
  exports: []
})
export class ReceiptProcessingSettingsModule {}
