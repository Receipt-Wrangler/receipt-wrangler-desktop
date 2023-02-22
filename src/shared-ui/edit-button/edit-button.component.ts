import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormMode } from 'src/enums/form-mode.enum';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.scss'],
})
export class EditButtonComponent {
  @Input() public mode!: FormMode;

  @Output() public clicked: EventEmitter<void> = new EventEmitter<void>();
}
