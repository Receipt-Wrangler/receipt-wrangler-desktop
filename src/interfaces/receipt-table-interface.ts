import { PagedRequestFilter } from "src/api";

import { SortDirection } from "@angular/material/sort";

export interface ReceiptTableInterface {
  page: number;
  pageSize: number;
  orderBy: string;
  sortDirection: SortDirection;
  filter: PagedRequestFilter;
}
