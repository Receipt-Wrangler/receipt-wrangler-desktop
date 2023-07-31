import { Component } from '@angular/core';
import { BaseInputComponent } from '@noah231515/receipt-wrangler-core';
import { InputInterface } from '@noah231515/receipt-wrangler-core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent
  extends BaseInputComponent
  implements InputInterface {}
