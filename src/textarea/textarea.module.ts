import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaComponent } from './textarea/textarea.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TextareaComponent],
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule],
  exports: [TextareaComponent],
})
export class TextareaModule {}
