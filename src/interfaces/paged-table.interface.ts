import { SortDirection } from '@angular/material/sort';
import { ReceiptPagedRequestFilter } from '@receipt-wrangler/receipt-wrangler-core';

export interface PagedTableInterface {
  page: number;
  pageSize: number;
  orderBy: string;
  sortDirection: SortDirection;
}
