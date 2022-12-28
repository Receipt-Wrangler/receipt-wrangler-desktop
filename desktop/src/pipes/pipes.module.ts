import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGetPipe } from './form-get.pipe';

@NgModule({
  declarations: [FormGetPipe],
  imports: [CommonModule],
  exports: [FormGetPipe],
})
export class PipesModule {}
