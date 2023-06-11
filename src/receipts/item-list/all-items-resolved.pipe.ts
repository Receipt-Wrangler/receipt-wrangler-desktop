import { Pipe, PipeTransform } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Item } from 'src/models';

@Pipe({
  name: 'allUserItemsResolved',
})
export class AllUserItemsResolvedPipe implements PipeTransform {
  public transform(userId: string, receiptItems: FormArray): boolean {
    const userItems = (receiptItems.value as Item[]).every(i);
    console.warn('runing');
    return userItems.every(
      (i) => i.get('status')?.value === ItemStatus.RESOLVED
    );
  }
}
