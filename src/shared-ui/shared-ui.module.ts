import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'src/button/button.module';
import { SubmitButtonComponent } from './submit-button/submit-button.component';
import { CancelButtonComponent } from './cancel-button/cancel-button.component';

@NgModule({
  declarations: [
    SubmitButtonComponent,
    CancelButtonComponent
  ],
  imports: [CommonModule, ButtonModule],
  exports: [
    SubmitButtonComponent,
    CancelButtonComponent
  ],
})
export class SharedUiModule {}
