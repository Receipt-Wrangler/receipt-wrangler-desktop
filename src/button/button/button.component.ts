import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  // add custom icon input
  @Input() color: string = 'primary';
  @Input() buttonText: string = '';
  @Input() type: 'button' | 'menu' | 'submit' | 'reset' = 'button';
  @Input() matButtonType: 'matRaisedButton' | 'iconButton' | 'basic' =
    'matRaisedButton';
  @Input() icon: string = '';
  @Input() customIcon: string = '';
  @Input() disabled: boolean = false;
  @Input() public buttonRouterLink: string[] = [];
  @Input() public tooltip: string = '';
  @Output() public clicked: EventEmitter<void> = new EventEmitter<void>();

  public emitClicked(): void {
    this.clicked.emit();
  }
}
