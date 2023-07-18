import { Pipe, PipeTransform } from '@angular/core';
import { Receipt } from 'src/api';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  public transform(status: string): string {
    switch (status) {
      case Receipt.StatusEnum.OPEN:
        return 'Open';

      case Receipt.StatusEnum.NEEDSATTENTION:
        return 'Needs Attention';

      case Receipt.StatusEnum.RESOLVED:
        return 'Resolved';

      default:
        return status;
    }
  }
}
