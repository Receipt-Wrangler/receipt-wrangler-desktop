import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormArrayLastPipe } from './form-array-last.pipe';
import { GroupRolePipe } from './group-role.pipe';
import { GroupPipe } from './group.pipe';
import { ImagePipe } from './image.pipe';
import { InputReadonlyPipe } from './input-readonly.pipe';
import { MapGetPipe } from './map-get.pipe';
import { MapKeyPipe } from './map-key.pipe';
import { NamePipe } from './name.pipe';
import { StatusPipe } from './status.pipe';
import { UserPipe } from './user.pipe';

@NgModule({
  declarations: [
    FormArrayLastPipe,

    GroupRolePipe,
    ImagePipe,
    InputReadonlyPipe,
    MapGetPipe,
    MapKeyPipe,
    NamePipe,
    StatusPipe,
    UserPipe,
    GroupPipe,
  ],
  imports: [CommonModule],
  exports: [
    FormArrayLastPipe,

    GroupRolePipe,
    ImagePipe,
    InputReadonlyPipe,
    MapGetPipe,
    MapKeyPipe,
    NamePipe,
    StatusPipe,
    UserPipe,
    GroupPipe,
  ],
})
export class PipesModule {}
