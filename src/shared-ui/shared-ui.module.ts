import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import {
  ButtonModule,
  PipesModule as CorePipesModule,
} from '@receipt-wrangler/receipt-wrangler-core';
import { PipesModule } from 'src/pipes/pipes.module';
import { SelectModule } from 'src/select/select.module';
import { BackButtonComponent } from './back-button/back-button.component';
import { CancelButtonComponent } from './cancel-button/cancel-button.component';
import { CardComponent } from './card/card.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { DialogFooterComponent } from './dialog-footer/dialog-footer.component';
import { DialogComponent } from './dialog/dialog.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { FormButtonBarComponent } from './form-button-bar/form-button-bar.component';
import { FormButtonComponent } from './form-button/form-button.component';
import { FormHeaderComponent } from './form-header/form-header.component';
import { FormSectionComponent } from './form-section/form-section.component';
import { GroupAutocompleteComponent } from './group-autocomplete/group-autocomplete.component';
import { StatusChipComponent } from './status-chip/status-chip.component';
import { StatusSelectComponent } from './status-select/status-select.component';
import { SubmitButtonComponent } from './submit-button/submit-button.component';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { AutocompleteModule } from 'src/autocomplete/autocomplete.module';
import { AddButtonComponent } from './add-button/add-button.component';
import { RouterModule } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormListComponent } from './form-list/form-list.component';

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
    GroupAutocompleteComponent,
    StatusChipComponent,
    StatusSelectComponent,
    SubmitButtonComponent,
    SummaryCardComponent,
    TableHeaderComponent,
    AddButtonComponent,
    TabsComponent,
    FormComponent,
    FormListComponent,
  ],
  imports: [
    AutocompleteModule,
    ButtonModule,
    CommonModule,
    CorePipesModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatListModule,
    MatTableModule,
    MatTabsModule,
    PipesModule,
    ReactiveFormsModule,
    RouterModule,
    SelectModule,
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
    GroupAutocompleteComponent,
    StatusChipComponent,
    StatusSelectComponent,
    SubmitButtonComponent,
    SummaryCardComponent,
    TableHeaderComponent,
    AddButtonComponent,
    TabsComponent,
    FormComponent,
    FormListComponent,
  ],
})
export class SharedUiModule {}
