import { Injectable } from '@angular/core';
import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map, catchError, of } from 'rxjs';
import { UserService } from 'src/api-new';

@Injectable()
export class UserValidators {
  constructor(private userService: UserService) {}
  uniqueUsername(threshold: number, originalValue: string): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      return this.userService.getUsernameCount(control.value).pipe(
        map((usernameCount) => {
          if (usernameCount > threshold && control.value !== originalValue) {
            return { duplicate: true };
          }
          return null;
        })
      );
    };
  }
}
