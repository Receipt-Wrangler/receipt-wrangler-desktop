import { Component, Input } from '@angular/core';
import { FormMode } from 'src/enums/form-mode.enum';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
})
export class SubmitButtonComponent {
  @Input() public mode?: FormMode;

  public formMode = FormMode;
}
