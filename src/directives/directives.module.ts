import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleDirective } from './role.directive';
import { FeatureDirective } from './feature.directive';

@NgModule({
  declarations: [RoleDirective, FeatureDirective],
  imports: [CommonModule],
  exports: [RoleDirective, FeatureDirective],
})
export class DirectivesModule {}
