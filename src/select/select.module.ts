import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SelectComponent],
  imports: [CommonModule, MatSelectModule, ReactiveFormsModule],
  exports: [SelectComponent],
})
export class SelectModule {}
