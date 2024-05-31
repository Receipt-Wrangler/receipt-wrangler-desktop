import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportFormComponent } from './import-form/import-form.component';



@NgModule({
  declarations: [
    ImportFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImportFormComponent
  ]
})
export class ImportModule { }
