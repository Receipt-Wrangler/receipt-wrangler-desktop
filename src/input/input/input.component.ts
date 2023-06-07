import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { BaseInputComponent } from 'src/base-input/base-input/base-input.component';
import { InputInterface } from '../input.interface';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent
  extends BaseInputComponent
  implements InputInterface, OnChanges
{
  @ViewChild('nativeInput') public nativeInput!: { nativeElement: HTMLElement };

  @Input() public inputId: string = '';

  @Input() public type: string = 'text';

  @Input() public showVisibilityEye = false;

  @Input() public isCurrency: boolean = false;

  @Output() public inputBlur: EventEmitter<any> = new EventEmitter<any>(
    undefined
  );

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['isCurrency']?.currentValue) {
      this.maskPrefix = '$ ';
      this.mask = 'separator.2';
      this.thousandSeparator = ',';
    }
  }

  public toggleVisibility(): void {
    if (this.type !== 'password') {
      this.type = 'password';
    } else {
      this.type = 'text';
    }
  }

  // TODO: Figure this out as apart of validation issues
  // private getMinValue(): string {
  //   const err = this.inputFormControl.errors as any;
  //   return err['min']['min'] ?? '0';
  // }
}
