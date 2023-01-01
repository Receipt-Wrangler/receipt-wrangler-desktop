import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocomleteComponent } from './autocomlete/autocomlete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [AutocomleteComponent],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  exports: [AutocomleteComponent],
})
export class AutocompleteModule {}
