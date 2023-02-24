import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormMode } from 'src/enums/form-mode.enum';

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss'],
})
export class FormButtonComponent {
  @Input() public mode!: FormMode;

  @Input() public tooltip: string = '';

  @Input() public disabled: boolean = false;

  @Output() public clicked: EventEmitter<void> = new EventEmitter<void>();
}
