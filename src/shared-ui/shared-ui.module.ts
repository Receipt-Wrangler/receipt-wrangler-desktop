import { PipesModule } from "src/pipes/pipes.module";
import { SelectModule } from "src/select/select.module";

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";
import { ButtonModule } from "@receipt-wrangler/receipt-wrangler-core";

import { BackButtonComponent } from "./back-button/back-button.component";
import { CancelButtonComponent } from "./cancel-button/cancel-button.component";
import { CardComponent } from "./card/card.component";
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";
import { DeleteButtonComponent } from "./delete-button/delete-button.component";
import { DialogFooterComponent } from "./dialog-footer/dialog-footer.component";
import { DialogComponent } from "./dialog/dialog.component";
import { EditButtonComponent } from "./edit-button/edit-button.component";
import { FormButtonBarComponent } from "./form-button-bar/form-button-bar.component";
import { FormButtonComponent } from "./form-button/form-button.component";
import { FormHeaderComponent } from "./form-header/form-header.component";
import { FormSectionComponent } from "./form-section/form-section.component";
import { StatusChipComponent } from "./status-chip/status-chip.component";
import { StatusSelectComponent } from "./status-select/status-select.component";
import { SubmitButtonComponent } from "./submit-button/submit-button.component";
import { SummaryCardComponent } from "./summary-card/summary-card.component";
import { TableHeaderComponent } from "./table-header/table-header.component";

@NgModule({
  declarations: [
    BackButtonComponent,
    CancelButtonComponent,
    CardComponent,
    ConfirmationDialogComponent,
    DeleteButtonComponent,
    DialogComponent,
    DialogFooterComponent,
    EditButtonComponent,
    FormButtonBarComponent,
    FormButtonComponent,
    FormHeaderComponent,
    FormSectionComponent,
    StatusChipComponent,
    SubmitButtonComponent,
    SummaryCardComponent,
    TableHeaderComponent,
    StatusSelectComponent,
  ],
  imports: [
    ButtonModule,
    MatListModule,
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatTableModule,
    MatDialogModule,
    SelectModule,
    PipesModule,
  ],
  exports: [
    BackButtonComponent,
    CancelButtonComponent,
    CardComponent,
    ConfirmationDialogComponent,
    DeleteButtonComponent,
    DialogComponent,
    DialogFooterComponent,
    EditButtonComponent,
    FormButtonBarComponent,
    FormHeaderComponent,
    FormSectionComponent,
    StatusChipComponent,
    SubmitButtonComponent,
    SummaryCardComponent,
    TableHeaderComponent,
    StatusSelectComponent,
  ],
})
export class SharedUiModule {}
