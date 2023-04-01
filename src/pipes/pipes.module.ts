import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGetPipe } from './form-get.pipe';
import { NamePipe } from './name.pipe';
import { MapKeyPipe } from './map-key.pipe';
import { MapGetPipe } from './map-get.pipe';
import { UserPipe } from './user.pipe';
import { InputReadonlyPipe } from './input-readonly.pipe';

import { ImagePipe } from './image.pipe';
import { GroupRolePipe } from './group-role.pipe';
import { FormArrayLastPipe } from './form-array-last.pipe';

@NgModule({
  declarations: [
    FormGetPipe,
    NamePipe,
    MapKeyPipe,
    MapGetPipe,
    UserPipe,
    InputReadonlyPipe,
    ImagePipe,
    GroupRolePipe,
    FormArrayLastPipe,
  ],
  imports: [CommonModule],
  exports: [
    FormGetPipe,
    NamePipe,
    MapKeyPipe,
    MapGetPipe,
    UserPipe,
    InputReadonlyPipe,
    ImagePipe,
    GroupRolePipe,
    FormArrayLastPipe,
  ],
})
export class PipesModule {}
