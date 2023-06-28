import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss'],
})
export class FormHeaderComponent {
  @Input() public headerText: string = '';

  @Input() public buttonRouterLink: string[] = [];
}
