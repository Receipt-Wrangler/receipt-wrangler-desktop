import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, of, startWith } from 'rxjs';
import { BaseInputComponent } from 'src/base-input/base-input/base-input.component';
import { InputInterface } from '../input.interface';
interface InputErrorMessage {
  error: string;
  message: string;
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent
  extends BaseInputComponent
  implements InputInterface
{
  @Input() type: string = 'text';

  // TODO: Figure this out as apart of validation issues
  // private getMinValue(): string {
  //   const err = this.inputFormControl.errors as any;
  //   return err['min']['min'] ?? '0';
  // }
}
