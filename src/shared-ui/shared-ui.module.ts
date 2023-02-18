import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'src/button/button.module';
import { SubmitButtonComponent } from './submit-button/submit-button.component';
import { CancelButtonComponent } from './cancel-button/cancel-button.component';
import { FormButtonBarComponent } from './form-button-bar/form-button-bar.component';

@NgModule({
  declarations: [
    CancelButtonComponent,
    FormButtonBarComponent,
    SubmitButtonComponent,
  ],
  imports: [CommonModule, ButtonModule],
  exports: [
    CancelButtonComponent,
    FormButtonBarComponent,
    SubmitButtonComponent,
  ],
})
export class SharedUiModule {}
