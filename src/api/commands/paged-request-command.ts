export interface PagedRequestCommand {
  page: Number;
  pageSize: number;
  orderBy: string;
  sortDirection: string;
  filter?: PagedRequestFilter;
}

interface PagedRequestFilter {
  name: PagedRequestFilterField;
  paidBy: PagedRequestFilterField;
}

interface PagedRequestFilterField {
  operation: PagedRequestFilterOperation;
  value: string;
}

enum PagedRequestFilterOperation {
  CONTAINS = 'CONTAINS',
  EQUALS = 'EQUALS',
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
}
