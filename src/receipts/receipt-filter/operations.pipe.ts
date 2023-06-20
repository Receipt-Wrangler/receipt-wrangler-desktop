import { Pipe, PipeTransform } from '@angular/core';
import { numberOperationOptions, textOperationOptions } from 'src/constants';

@Pipe({
  name: 'operations',
})
export class OperationsPipe implements PipeTransform {
  public transform(type: string): string[] {
    switch (type) {
      case 'text':
        return textOperationOptions;

      case 'number':
        return numberOperationOptions;

      default:
        return [];
    }
  }
}
