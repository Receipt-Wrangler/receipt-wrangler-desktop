import { Component, Input } from '@angular/core';
import { Widget } from '@receipt-wrangler/receipt-wrangler-core';

@Component({
  selector: 'app-filtered-receipts',
  templateUrl: './filtered-receipts.component.html',
  styleUrls: ['./filtered-receipts.component.scss'],
})
export class FilteredReceiptsComponent {
  @Input() public widget!: Widget;
}
