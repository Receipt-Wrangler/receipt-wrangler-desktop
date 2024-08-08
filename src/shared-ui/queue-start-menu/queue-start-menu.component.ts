import { Component, Input } from "@angular/core";
import { Receipt } from "../../open-api/index";
import { QueueMode, ReceiptQueueService } from "../../services/receipt-queue.service";

@Component({
  selector: "app-queue-start-menu",
  templateUrl: "./queue-start-menu.component.html",
  styleUrl: "./queue-start-menu.component.scss"
})
export class QueueStartMenuComponent {
  @Input() public buttonText: string = "";

  @Input() public buttonIcon: string = "";

  @Input() public matButtonType: "matRaisedButton" | "iconButton" | "basic" = "matRaisedButton";

  @Input() public color: string = "primary";

  @Input() public receiptIds: string[] | number[] = [];

  @Input() public receipts: Receipt[] = [];

  protected readonly QueueMode = QueueMode;

  constructor(private receiptQueueService: ReceiptQueueService) {}

  private getReceiptIds(): string[] {
    if (this.receiptIds.length > 0) {
      return this.receiptIds.map(id => id.toString());
    } else if (this.receipts.length > 0) {
      return this.receipts.map(receipt => receipt.id.toString());
    } else {
      return [];
    }
  }

  public initQueue(mode: QueueMode): void {
    this.receiptQueueService.initQueueAndNavigate(this.getReceiptIds(), mode);
  }
}
