import { Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormConfig } from 'src/interfaces';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Input() public formConfig!: FormConfig;

  @Input() public form!: FormGroup;

  @Input() public formTemplate!: TemplateRef<any>;

  @Input() public editButtonRouterLink: string[] = [];
}
