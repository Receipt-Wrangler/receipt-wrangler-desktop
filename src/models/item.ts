import { ItemStatus } from 'src/enums/receipt-item.status.enum';

export interface Item {
  name: string;
  chargedToUserId: number;
  receiptId: number;
  amount: number;
  isTaxed: boolean;
  status: ItemStatus;
}
