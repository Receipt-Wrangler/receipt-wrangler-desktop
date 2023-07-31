import { SortDirection } from "@angular/material/sort";
import { PagedRequestFilter } from "@noah231515/receipt-wrangler-core";

export interface ReceiptTableInterface {
  page: number;
  pageSize: number;
  orderBy: string;
  sortDirection: SortDirection;
  filter: PagedRequestFilter;
}
