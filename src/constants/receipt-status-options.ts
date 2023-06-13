import { GroupStatus } from 'src/enums/group-status.enum';
import { ItemStatus } from 'src/enums/receipt-item.status.enum';
import { ReceiptStatus } from 'src/enums/receipt-status.enum';

export const RECEIPT_STATUS_OPTIONS = Object.keys(ReceiptStatus);
export const RECEIPT_ITEM_STATUS_OPTIONS = Object.keys(ItemStatus);
export const GROUP_STATUS_OPTIONS = Object.keys(GroupStatus);
