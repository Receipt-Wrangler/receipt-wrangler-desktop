import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevelopmentDirective } from './development.directive';

@NgModule({
  declarations: [DevelopmentDirective],
  exports: [DevelopmentDirective],
  imports: [CommonModule],
})
export class DirectivesModule {}
