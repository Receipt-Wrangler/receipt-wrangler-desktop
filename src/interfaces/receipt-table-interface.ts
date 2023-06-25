import { SortDirection } from '@angular/material/sort';
import { PagedRequestFilter } from 'src/api/commands/paged-request-command';

export interface ReceiptTableInterface {
  page: number;
  pageSize: number;
  orderBy: string;
  sortDirection: SortDirection;
  filter: PagedRequestFilter;
}
