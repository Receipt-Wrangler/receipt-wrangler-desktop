import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { ButtonModule } from 'src/button/button.module';
import { PipesModule } from 'src/pipes/pipes.module';
import { BackButtonComponent } from './back-button/back-button.component';
import { CancelButtonComponent } from './cancel-button/cancel-button.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { DialogFooterComponent } from './dialog-footer/dialog-footer.component';
import { DialogComponent } from './dialog/dialog.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { FormButtonBarComponent } from './form-button-bar/form-button-bar.component';
import { FormButtonComponent } from './form-button/form-button.component';
import { StatusChipComponent } from './status-chip/status-chip.component';
import { SubmitButtonComponent } from './submit-button/submit-button.component';
import { TableHeaderComponent } from './table-header/table-header.component';

@NgModule({
  declarations: [
    BackButtonComponent,
    CancelButtonComponent,
    ConfirmationDialogComponent,
    DeleteButtonComponent,
    DialogComponent,
    DialogFooterComponent,
    EditButtonComponent,
    FormButtonBarComponent,
    FormButtonComponent,
    StatusChipComponent,
    SubmitButtonComponent,
    TableHeaderComponent,
  ],
  imports: [CommonModule, ButtonModule, MatTableModule, MatChipsModule, PipesModule],
  exports: [
    BackButtonComponent,
    CancelButtonComponent,
    ConfirmationDialogComponent,
    DeleteButtonComponent,
    DialogComponent,
    DialogFooterComponent,
    EditButtonComponent,
    FormButtonBarComponent,
    StatusChipComponent,
    SubmitButtonComponent,
    TableHeaderComponent,
  ],
})
export class SharedUiModule {}
