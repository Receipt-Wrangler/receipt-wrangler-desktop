import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, of, startWith } from 'rxjs';
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
export class InputComponent implements OnInit, OnChanges, InputInterface {
  @Input() inputFormControl: FormControl = new FormControl();

  @Input() label: string = '';

  @Input() additionalErrorMessages?: { [key: string]: string };

  public errorMessages: { [key: string]: string } = {};

  public formControlErrors!: Observable<InputErrorMessage[]>;

  public ngOnChanges(): void {}

  public ngOnInit(): void {
    this.errorMessages = {
      required: `${this.label} is required.`,
    };

    this.formControlErrors = this.inputFormControl.valueChanges.pipe(
      startWith(this.inputFormControl.value),
      map(() => {
        const errors = this.inputFormControl.errors;
        if (errors) {
          const keys = Object.keys(this.inputFormControl.errors as any);
          return keys.map((k: string) => {
            const value = errors[k];
            let message = '';

            if (typeof value === 'string') {
              message = value;
            } else if (this.errorMessages[k]) {
              message = this.errorMessages[k];
            }

            return {
              error: k as string,
              message: message,
            };
          });
        } else {
          return [];
        }
      })
    );

    this.formControlErrors.subscribe((e) => console.log(e));

    if (this.additionalErrorMessages) {
      this.errorMessages = {
        ...this.errorMessages,
        ...this.additionalErrorMessages,
      };
    }
  }
}
