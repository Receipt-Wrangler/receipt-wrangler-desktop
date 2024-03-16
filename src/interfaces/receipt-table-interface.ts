import { SortDirection } from "@angular/material/sort";
import { ReceiptPagedRequestFilter } from "../open-api";

export interface ReceiptTableInterface {
  page: number;
  pageSize: number;
  orderBy: string;
  sortDirection: SortDirection;
  filter: ReceiptPagedRequestFilter;
}
