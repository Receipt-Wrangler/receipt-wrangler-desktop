import { PagedTableInterface } from 'src/interfaces/paged-table.interface';

export class SetPage {
  static readonly type = '[PagedTable] Set Page';

  constructor(public page: number) {}
}

export class SetPageSize {
  static readonly type = '[PagedTable] Set Page Size';

  constructor(public pageSize: number) {}
}

export class SetPagedTableData {
  static readonly type = '[PagedTable] Set Paged Table Data';

  constructor(public data: PagedTableInterface) {}
}
