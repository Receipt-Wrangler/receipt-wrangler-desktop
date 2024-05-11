import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReceiptProcessingSettingsTableComponent } from "./receipt-processing-settings-table/receipt-processing-settings-table.component";


@NgModule({
  declarations: [ReceiptProcessingSettingsTableComponent],
  imports: [
    CommonModule
  ],
  exports: []
})
export class ReceiptProcessingSettingsModule {}
