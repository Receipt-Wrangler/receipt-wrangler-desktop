import { Pipe, PipeTransform } from '@angular/core';
import { ReceiptStatus } from 'src/enums/receipt-status.enum';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  public transform(status: string): string {
    switch (status) {
      case ReceiptStatus.OPEN:
        return "Open"
        
      case ReceiptStatus.NEEDS_ATTENTION:
        return "Needs Attention"
      
        case ReceiptStatus.RESOLVED:
          return "Resolved"
    
      default:
        return status;
    }
  }
}
