export interface PagedRequestCommand {
  page: Number;
  pageSize: number;
  orderBy: string;
  sortDirection: string;
  filter?: PagedRequestFilter;
}

export interface PagedRequestFilter {
  date: PagedRequestFilterField;
  amount: PagedRequestFilterField;
  name: PagedRequestFilterField;
  paidBy: PagedRequestFilterField;
  resolvedDate: PagedRequestFilterField;
}

export interface PagedRequestFilterField {
  operation: PagedRequestFilterOperation;
  value: string | string[];
}

export enum PagedRequestFilterOperation {
  CONTAINS = 'CONTAINS',
  EQUALS = 'EQUALS',
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
}
