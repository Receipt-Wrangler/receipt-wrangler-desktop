import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TableModule } from "../table/table.module";
import { ReceiptProcessingSettingsTableComponent } from "./receipt-processing-settings-table/receipt-processing-settings-table.component";


@NgModule({
  declarations: [ReceiptProcessingSettingsTableComponent],
  imports: [
    CommonModule,
    TableModule
  ],
  exports: []
})
export class ReceiptProcessingSettingsModule {}
