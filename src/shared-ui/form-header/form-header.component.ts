import { Component, Input, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss'],
})
export class FormHeaderComponent {
  @Input() public headerText: string = '';

  @Input() public headerButtonsTemplate?: TemplateRef<any>;

  constructor(private location: Location) {}

  public navigateBack(): void {
    this.location.back();
  }
}
