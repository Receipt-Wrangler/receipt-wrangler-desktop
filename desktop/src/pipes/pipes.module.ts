import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGetPipe } from './form-get.pipe';
import { NamePipe } from './name.pipe';
import { MapKeyPipe } from './map-key.pipe';
import { MapGetPipe } from './map-get.pipe';
import { UserPipe } from './user.pipe';

@NgModule({
  declarations: [FormGetPipe, NamePipe, MapKeyPipe, MapGetPipe, UserPipe],
  imports: [CommonModule],
  exports: [FormGetPipe, NamePipe, MapKeyPipe, MapGetPipe, UserPipe],
})
export class PipesModule {}
