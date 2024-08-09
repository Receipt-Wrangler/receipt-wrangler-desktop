import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { AutocompleteModule } from "src/autocomplete/autocomplete.module";
import { DatepickerModule } from "src/datepicker/datepicker.module";
import { PipesModule } from "src/pipes/pipes.module";
import { SelectModule } from "src/select/select.module";
import { UserAutocompleteModule } from "src/user-autocomplete/user-autocomplete.module";
import { ButtonModule } from "../button";
import { DirectivesModule } from "../directives";
import { InputModule } from "../input";
import { TableModule } from "../table/table.module";
import { AccordionComponent } from "./accordion/accordion.component";
import { AddButtonComponent } from "./add-button/add-button.component";
import { AuditDetailSectionComponent } from "./audit-detail-section/audit-detail-section.component";
import { BackButtonComponent } from "./back-button/back-button.component";
import { BaseTableComponent } from "./base-table/base-table.component";
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
import { FormListComponent } from "./form-list/form-list.component";
import { FormSectionComponent } from "./form-section/form-section.component";
import { FormComponent } from "./form/form.component";
import { GroupAutocompleteComponent } from "./group-autocomplete/group-autocomplete.component";
import { HelpIconComponent } from "./help-icon/help-icon.component";
import { ImageViewerComponent } from "./image-viewer/image-viewer.component";
import { PrettyJsonComponent } from "./pretty-json/pretty-json.component";
import { QueueStartMenuComponent } from "./queue-start-menu/queue-start-menu.component";
import { QuickScanButtonComponent } from "./quick-scan-button/quick-scan-button.component";
import { OperationsPipe } from "./receipt-filter/operations.pipe";
import { ReceiptFilterComponent } from "./receipt-filter/receipt-filter.component";
import { StatusChipComponent } from "./status-chip/status-chip.component";
import { StatusIconComponent } from "./status-icon/status-icon.component";
import { StatusSelectComponent } from "./status-select/status-select.component";
import { SubmitButtonComponent } from "./submit-button/submit-button.component";
import { SummaryCardComponent } from "./summary-card/summary-card.component";
import { TableHeaderComponent } from "./table-header/table-header.component";
import { TabsComponent } from "./tabs/tabs.component";
import { PrettyJsonPipe } from "./task-table/pretty-json.pipe";
import { SystemTaskTypePipe } from "./task-table/system-task-type.pipe";
import { TaskTableComponent } from "./task-table/task-table.component";

@NgModule({
  declarations: [
    AddButtonComponent,
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
    FormComponent,
    FormHeaderComponent,
    FormListComponent,
    FormSectionComponent,
    GroupAutocompleteComponent,
    HelpIconComponent,
    OperationsPipe,
    ReceiptFilterComponent,
    StatusChipComponent,
    StatusSelectComponent,
    SubmitButtonComponent,
    SummaryCardComponent,
    TableHeaderComponent,
    TabsComponent,
    QuickScanButtonComponent,
    AuditDetailSectionComponent,
    TaskTableComponent,
    StatusIconComponent,
    BaseTableComponent,
    PrettyJsonPipe,
    AccordionComponent,
    PrettyJsonComponent,
    ImageViewerComponent,
    QueueStartMenuComponent,
  ],
  imports: [
    AutocompleteModule,
    ButtonModule,
    CommonModule,
    DatepickerModule,
    DirectivesModule,
    DragDropModule,
    InputModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    PipesModule,
    PipesModule,
    ReactiveFormsModule,
    RouterModule,
    SelectModule,
    SystemTaskTypePipe,
    MatMenuModule,
    TableModule,
    UserAutocompleteModule,
  ],
  exports: [
    AddButtonComponent,
    BackButtonComponent,
    CancelButtonComponent,
    CardComponent,
    ConfirmationDialogComponent,
    DeleteButtonComponent,
    DialogComponent,
    DialogFooterComponent,
    EditButtonComponent,
    FormButtonBarComponent,
    FormComponent,
    FormHeaderComponent,
    FormListComponent,
    FormSectionComponent,
    GroupAutocompleteComponent,
    HelpIconComponent,
    OperationsPipe,
    QuickScanButtonComponent,
    ReceiptFilterComponent,
    StatusChipComponent,
    StatusSelectComponent,
    SubmitButtonComponent,
    SummaryCardComponent,
    TableHeaderComponent,
    TabsComponent,
    AuditDetailSectionComponent,
    TaskTableComponent,
    StatusIconComponent,
    BaseTableComponent,
    PrettyJsonPipe,
    AccordionComponent,
    PrettyJsonComponent,
    ImageViewerComponent,
    QueueStartMenuComponent,
  ],
  providers: [CurrencyPipe],
})
export class SharedUiModule {}
