import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGetPipe } from './form-get.pipe';
import { NamePipe } from './name.pipe';

@NgModule({
  declarations: [FormGetPipe, NamePipe],
  imports: [CommonModule],
  exports: [FormGetPipe, NamePipe],
})
export class PipesModule {}
