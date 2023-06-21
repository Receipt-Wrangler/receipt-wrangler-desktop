import { Pipe, PipeTransform } from '@angular/core';
import {
  dateOperationOptions,
  numberOperationOptions,
  textOperationOptions,
  usersOperationOptions,
} from 'src/constants';

@Pipe({
  name: 'operations',
})
export class OperationsPipe implements PipeTransform {
  public transform(type: string): string[] {
    switch (type) {
      case 'date':
        return dateOperationOptions;

      case 'text':
        return textOperationOptions;

      case 'number':
        return numberOperationOptions;

      case 'users':
        return usersOperationOptions;

      default:
        return [];
    }
  }
}
