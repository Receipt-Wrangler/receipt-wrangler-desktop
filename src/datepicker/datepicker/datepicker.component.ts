import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseInputComponent } from 'src/base-input/base-input/base-input.component';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent extends BaseInputComponent {}
