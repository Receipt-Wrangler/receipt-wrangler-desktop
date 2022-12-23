import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputInterface } from '../input.interface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements InputInterface {
  @Input() inputFormControl: FormControl = new FormControl();
  @Input() label: string = '';
}
