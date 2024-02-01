import {
  dateOperationOptions, listOperationOptions, numberOperationOptions, textOperationOptions,
  usersOperationOptions
} from "src/constants";

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'operations',
})
export class OperationsPipe implements PipeTransform {
  public transform(type: string): unknown[] {
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
