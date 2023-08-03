import { Component } from '@angular/core';
import { BaseInputComponent } from '@receipt-wrangler/receipt-wrangler-core';
import { InputInterface } from '@receipt-wrangler/receipt-wrangler-core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent
  extends BaseInputComponent
  implements InputInterface {}
