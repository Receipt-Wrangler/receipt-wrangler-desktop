import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ButtonModule } from 'src/button/button.module';
import { CancelButtonComponent } from './cancel-button/cancel-button.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { DialogFooterComponent } from './dialog-footer/dialog-footer.component';
import { DialogComponent } from './dialog/dialog.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { FormButtonBarComponent } from './form-button-bar/form-button-bar.component';
import { FormButtonComponent } from './form-button/form-button.component';
import { SubmitButtonComponent } from './submit-button/submit-button.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { BackButtonComponent } from './back-button/back-button.component';

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
    BackButtonComponent,
  ],
  imports: [CommonModule, ButtonModule, MatTableModule],
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
    BackButtonComponent,
  ],
})
export class SharedUiModule {}
