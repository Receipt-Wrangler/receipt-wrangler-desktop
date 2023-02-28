import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'src/button/button.module';
import { SubmitButtonComponent } from './submit-button/submit-button.component';
import { CancelButtonComponent } from './cancel-button/cancel-button.component';
import { FormButtonBarComponent } from './form-button-bar/form-button-bar.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogFooterComponent } from './dialog-footer/dialog-footer.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { FormButtonComponent } from './form-button/form-button.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    CancelButtonComponent,
    FormButtonBarComponent,
    SubmitButtonComponent,
    TableHeaderComponent,
    EditButtonComponent,
    DialogComponent,
    DialogFooterComponent,
    DeleteButtonComponent,
    FormButtonComponent,
    ConfirmationDialogComponent,
  ],
  imports: [CommonModule, ButtonModule],
  exports: [
    CancelButtonComponent,
    FormButtonBarComponent,
    SubmitButtonComponent,
    TableHeaderComponent,
    EditButtonComponent,
    DialogComponent,
    DialogFooterComponent,
    DeleteButtonComponent,
    ConfirmationDialogComponent,
  ],
})
export class SharedUiModule {}
