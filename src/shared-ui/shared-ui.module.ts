import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'src/button/button.module';
import { SubmitButtonComponent } from './submit-button/submit-button.component';

@NgModule({
  declarations: [
    SubmitButtonComponent
  ],
  imports: [CommonModule, ButtonModule],
  exports: [
    SubmitButtonComponent
  ],
})
export class SharedUiModule {}
