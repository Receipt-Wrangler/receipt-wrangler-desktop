export interface PagedRequestCommand {
  page: Number;
  pageSize: number;
  orderBy: string;
  sortDirection: string;
  filter?: PagedRequestFilter;
}

export interface PagedRequestFilter {
  name: PagedRequestFilterField;
  paidBy: PagedRequestFilterField;
}

export interface PagedRequestFilterField {
  operation: PagedRequestFilterOperation;
  value: string;
}

export enum PagedRequestFilterOperation {
  CONTAINS = 'CONTAINS',
  EQUALS = 'EQUALS',
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
}
