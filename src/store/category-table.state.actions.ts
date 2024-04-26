import { SortDirection } from "@angular/material/sort";

export class SetPage {
  static readonly type = "[CategoryTable] Set Page";

  constructor(public page: number) {}
}

export class SetPageSize {
  static readonly type = "[CategoryTable] Set Page Size";

  constructor(public pageSize: number) {}
}

export class SetOrderBy {
  static readonly type = "[CategoryTable] Set Order By";

  constructor(public orderBy: string) {}
}

export class SetSortDirection {
  static readonly type = "[CategoryTable] Set Sort Direction";

  constructor(public sortDirection: SortDirection) {}
}
