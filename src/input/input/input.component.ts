import {
  Component,
  EventEmitter,
  Input,
  Output,
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
  implements InputInterface
{
  @ViewChild('nativeInput') public nativeInput!: { nativeElement: HTMLElement };
  @Input() inputId: string = '';
  @Input() type: string = 'text';
  @Output() public inputBlur: EventEmitter<any> = new EventEmitter<any>(
    undefined
  );

  // TODO: Figure this out as apart of validation issues
  // private getMinValue(): string {
  //   const err = this.inputFormControl.errors as any;
  //   return err['min']['min'] ?? '0';
  // }
}
