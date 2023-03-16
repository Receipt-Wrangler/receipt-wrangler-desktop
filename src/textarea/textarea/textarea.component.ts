import { Component } from '@angular/core';
import { BaseInputComponent } from 'src/base-input/base-input/base-input.component';
import { InputInterface } from 'src/input/input.interface';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent
  extends BaseInputComponent
  implements InputInterface {}
