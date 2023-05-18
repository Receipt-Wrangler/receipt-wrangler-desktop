import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.scss'],
})
export class FormSectionComponent {
  @Input() public headerText: string = '';

  @Input() public headerButtonsTemplate?: TemplateRef<any>;
}
