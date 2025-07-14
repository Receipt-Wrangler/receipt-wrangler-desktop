import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ShareData } from './item-list/item-list.component';

@Pipe({
    name: 'userTotalWithPercentage',
    pure: false,
    standalone: false
})
export class UserTotalWithPercentagePipe implements PipeTransform {
  public transform(
    userShareMap: Map<string, ShareData[]>,
    userId: string,
    form: FormGroup
  ): { total: number; percentage: number } {
    const shares = userShareMap.get(userId) as ShareData[];
    const userTotal = shares?.length > 0 && shares 
      ? shares.map((share) => Number(share.share.amount)).reduce((a, b) => a + b)
      : 0;

    const receiptTotal = Number(form.get('amount')?.value || 0);
    const percentage = receiptTotal > 0 ? (userTotal / receiptTotal) * 100 : 0;

    return {
      total: userTotal,
      percentage: Math.round(percentage * 100) / 100 // Round to 2 decimal places
    };
  }
}
