import { RECEIPT_STATUS_OPTIONS } from "src/constants";

import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-status-select',
  templateUrl: './status-select.component.html',
  styleUrls: ['./status-select.component.scss'],
})
export class StatusSelectComponent {
  @Input() public inputFormControl!: FormControl;

  @Input() public readonly: boolean = false;

  public receiptStatusOptions = RECEIPT_STATUS_OPTIONS;
}
