import { Component, Input } from '@angular/core';
import { ReceiptStatus } from 'src/enums/receipt-status.enum';

@Component({
  selector: 'app-status-chip',
  templateUrl: './status-chip.component.html',
  styleUrls: ['./status-chip.component.scss']
})
export class StatusChipComponent {
  @Input() public status: string = "";

  public receiptStatus = ReceiptStatus;
}
