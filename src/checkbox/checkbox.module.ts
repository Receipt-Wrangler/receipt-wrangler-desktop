import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { BaseInputInterface } from 'src/base-input/base-input.interface';

@NgModule({
  declarations: [CheckboxComponent],
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule],
  exports: [CheckboxComponent],
})
export class CheckboxModule {}
