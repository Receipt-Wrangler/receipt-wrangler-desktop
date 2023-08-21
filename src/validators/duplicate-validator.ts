import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { CategoryService } from '@receipt-wrangler/receipt-wrangler-core';
import { map, Observable, of } from 'rxjs';

@Injectable()
export class DuplicateValidator {
  constructor(private categoryService: CategoryService) {}
  isUnique(
    type: 'category',
    threshold: number,
    originalValue: string
  ): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      const obsrevable = this.getObservable(type, control);
      return obsrevable.pipe(
        map((usernameCount) => {
          if (usernameCount > threshold && control.value !== originalValue) {
            return { duplicate: true };
          }
          return null;
        })
      );
    };
  }

  private getObservable(
    type: 'category',
    control: AbstractControl
  ): Observable<number> {
    switch (type) {
      case 'category':
        return this.categoryService.getCategoryByName(control.value);
      default:
        return of(0);
    }
  }
}
