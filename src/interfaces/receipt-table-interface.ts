import { SortDirection } from '@angular/material/sort';
import { PagedRequestFilter } from '@receipt-wrangler/receipt-wrangler-core';

export interface ReceiptTableInterface {
  page: number;
  pageSize: number;
  orderBy: string;
  sortDirection: SortDirection;
  filter: PagedRequestFilter;
}
