import { Receipt } from '@receipt-wrangler/receipt-wrangler-core';

export function getReceiptStatusDisplayname(status: string): string {
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
