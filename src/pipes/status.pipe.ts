import { Pipe, PipeTransform } from '@angular/core';
import { getReceiptStatusDisplayname } from 'src/utils';
@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  public transform(status: string): string {
    return getReceiptStatusDisplayname(status);
  }
}
