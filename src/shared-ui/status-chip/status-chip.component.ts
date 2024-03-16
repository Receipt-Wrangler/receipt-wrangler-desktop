import { Component, Input } from "@angular/core";
import { ReceiptStatus } from "../../open-api";

@Component({
  selector: "app-status-chip",
  templateUrl: "./status-chip.component.html",
  styleUrls: ["./status-chip.component.scss"],
})
export class StatusChipComponent {
  @Input() public status: string = "";

  public receiptStatus = ReceiptStatus;
}
