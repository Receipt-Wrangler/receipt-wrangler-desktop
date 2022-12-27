import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() color: string = 'primary';
  @Input() buttonText: string = '';
  @Input() type: 'button' | 'menu' | 'submit' | 'reset' = 'button';
}
