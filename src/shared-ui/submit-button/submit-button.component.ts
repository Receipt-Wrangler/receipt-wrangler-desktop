import { Component, Input } from '@angular/core';
import { FormMode } from 'src/enums/form-mode.enum';
import { FormButtonComponent } from '../form-button/form-button.component';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
})
export class SubmitButtonComponent extends FormButtonComponent {
  public formMode = FormMode;
}
