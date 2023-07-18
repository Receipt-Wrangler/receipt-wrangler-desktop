import { Component, Input } from '@angular/core';
import { Receipt } from 'src/api';

@Component({
  selector: 'app-status-chip',
  templateUrl: './status-chip.component.html',
  styleUrls: ['./status-chip.component.scss'],
})
export class StatusChipComponent {
  @Input() public status: string = '';

  public receiptStatus = Receipt.StatusEnum;
}
