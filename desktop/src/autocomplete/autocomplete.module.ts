import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocomleteComponent } from './autocomlete/autocomlete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AutocomleteComponent],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
  ],
  exports: [AutocomleteComponent],
})
export class AutocompleteModule {}
