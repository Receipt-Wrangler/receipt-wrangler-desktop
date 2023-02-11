import { Injectable } from '@angular/core';
import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map, catchError, of } from 'rxjs';
import { UsersService } from 'src/api/users.service';

@Injectable()
export class UserValidators {
  constructor(private usersService: UsersService) {}
  uniqueUsername(threshold: number, originalValue: string): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      return this.usersService.getUsernameCount(control.value).pipe(
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
