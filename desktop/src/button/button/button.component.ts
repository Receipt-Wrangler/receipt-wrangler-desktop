import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  @Input() color: string = 'primary';
  @Input() buttonText: string = '';
  @Input() type: 'button' | 'menu' | 'submit' | 'reset' = 'button';
  @Input() matButtonType: 'matRaisedButton' | 'iconButton' = 'matRaisedButton';
  @Input() icon: string = '';
  @Input() disabled: boolean = false;
  @Input() public tooltip: string = '';
}
