import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-footer',
  templateUrl: './dialog-footer.component.html',
  styleUrls: ['./dialog-footer.component.scss'],
})
export class DialogFooterComponent {
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter<void>();
}
