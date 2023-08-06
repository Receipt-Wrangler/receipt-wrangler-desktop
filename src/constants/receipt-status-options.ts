import { Group, Item, Receipt } from '@receipt-wrangler/receipt-wrangler-core';
import { FormOption } from 'src/interfaces/form-option.interface';
import { getReceiptStatusDisplayname } from 'src/utils';

export const RECEIPT_STATUS_OPTIONS: FormOption[] = Object.keys(
  Receipt.StatusEnum
).map((key) => {
  return {
    value: key,
    displayValue: getReceiptStatusDisplayname(key),
  };
});
export const RECEIPT_ITEM_STATUS_OPTIONS = Object.keys(Item.StatusEnum);
export const GROUP_STATUS_OPTIONS = Object.keys(Group.StatusEnum);
