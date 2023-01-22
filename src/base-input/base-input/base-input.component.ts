import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { InputErrorMessage } from './input-error-message';

@Component({
  selector: 'app-base-input',
  templateUrl: './base-input.component.html',
  styleUrls: ['./base-input.component.scss'],
})
export class BaseInputComponent implements OnInit {
  @Input() public inputFormControl: FormControl = new FormControl();

  @Input() public label: string = '';

  @Input() public additionalErrorMessages?: { [key: string]: string };

  @Input() public readonly: boolean = false;

  public formControlErrors!: Observable<InputErrorMessage[]>;

  public errorMessages: { [key: string]: string } = {};

  public ngOnInit(): void {
    this.errorMessages = {
      required: `${this.label} is required.`,
      min: `Value must be larger than 0`,
    };

    this.formControlErrors = this.inputFormControl.statusChanges.pipe(
      startWith(this.inputFormControl.status),
      map(() => {
        const errors = this.inputFormControl.errors;
        if (errors) {
          console.warn(errors, 'errors');
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

    console.warn(this.errorMessages);

    if (this.additionalErrorMessages) {
      this.errorMessages = {
        ...this.errorMessages,
        ...this.additionalErrorMessages,
      };
    }
  }
}
