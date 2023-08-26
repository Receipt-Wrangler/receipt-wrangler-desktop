import { RECEIPT_STATUS_OPTIONS } from 'src/constants';

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-status-select',
  templateUrl: './status-select.component.html',
  styleUrls: ['./status-select.component.scss'],
})
export class StatusSelectComponent implements OnChanges {
  @Input() public inputFormControl!: FormControl;

  @Input() public readonly: boolean = false;

  @Input() public addBlankOption: boolean = false;

  public receiptStatusOptions = [...RECEIPT_STATUS_OPTIONS];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['addBlankOption']?.currentValue) {
      this.receiptStatusOptions.unshift({
        value: null,
        displayValue: '',
      });
    } else {
      this.receiptStatusOptions = RECEIPT_STATUS_OPTIONS;
    }
  }
}
