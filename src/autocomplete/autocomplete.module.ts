import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocomleteComponent } from './autocomlete/autocomlete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'src/button/button.module';

@NgModule({
  declarations: [AutocomleteComponent],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    ButtonModule,
  ],
  exports: [AutocomleteComponent],
})
export class AutocompleteModule {}