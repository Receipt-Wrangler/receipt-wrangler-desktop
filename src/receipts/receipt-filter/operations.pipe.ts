import { Pipe, PipeTransform } from '@angular/core';
import {
  dateOperationOptions,
  listOperationOptions,
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

      case 'list':
        return listOperationOptions;

      case 'users':
        return usersOperationOptions;

      default:
        return [];
    }
  }
}
