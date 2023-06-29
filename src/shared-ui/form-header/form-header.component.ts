import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss'],
})
export class FormHeaderComponent {
  @Input() public headerText: string = '';

  @Input() public buttonRouterLink?: string[];

  @Input() public headerButtonsTemplate?: TemplateRef<any>;
}
