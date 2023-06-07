import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseInputInterface } from 'src/base-input/base-input.interface';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements BaseInputInterface {
  @Input() public inputFormControl: FormControl<any> = new FormControl();

  @Input() public label: string = '';

  @Input() public additionalErrorMessages?:
    | { [key: string]: string }
    | undefined;

  @Input() public readonly: boolean = false;

  @Input() public placeholder?: string | undefined;
}
