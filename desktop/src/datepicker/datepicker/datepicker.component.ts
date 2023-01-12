import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent {
  @Input() public label: string = '';

  @Input() public inputFormControl: FormControl = new FormControl();

  @Input() public readonly: boolean = false;
}
