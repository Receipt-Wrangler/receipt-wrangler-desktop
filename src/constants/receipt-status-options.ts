import { FormOption } from 'src/interfaces/form-option.interface';
import { formatStatus } from 'src/utils';

import { Group, Item, Receipt } from '@receipt-wrangler/receipt-wrangler-core';

export const RECEIPT_STATUS_OPTIONS: FormOption[] = Object.keys(
  Receipt.StatusEnum
).map((key) => {
  const value = (Receipt.StatusEnum as any)[key];
  return {
    value: value,
    displayValue: formatStatus(value),
  };
});

export const RECEIPT_ITEM_STATUS_OPTIONS: FormOption[] = Object.keys(
  Item.StatusEnum
).map((key) => {
  const value = (Item.StatusEnum as any)[key];
  return {
    value: value,
    displayValue: formatStatus(value),
  };
});
export const GROUP_STATUS_OPTIONS = Object.keys(Group.StatusEnum);
