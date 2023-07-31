import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseInputComponent } from '@noah231515/receipt-wrangler-core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent extends BaseInputComponent {}
