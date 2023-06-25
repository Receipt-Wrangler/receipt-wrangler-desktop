import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-dialog-footer',
  templateUrl: './dialog-footer.component.html',
  styleUrls: ['./dialog-footer.component.scss'],
})
export class DialogFooterComponent {
  @Input() public additionalButtonsTemplate?: TemplateRef<any>;
  @Input() public submitButtonTooltip: string = 'Save';
  @Output() public cancelClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() public submitClicked: EventEmitter<void> = new EventEmitter<void>();
}
