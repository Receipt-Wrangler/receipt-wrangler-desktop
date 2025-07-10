import { ReceiptPagedRequestFilter } from "../open-api";
import { ReceiptTableInterface } from "../interfaces";
import { ReceiptTableColumnConfig } from "../interfaces/receipt-table-column-config.interface";

export class SetPage {
  static readonly type = "[ReceiptTable] Set Page";

  constructor(public page: number) {}
}

export class SetPageSize {
  static readonly type = "[ReceiptTable] Set Page Size";

  constructor(public pageSize: number) {}
}

export class SetReceiptFilterData {
  static readonly type = "[ReceiptTable] Set Filter Data";

  constructor(public data: ReceiptTableInterface) {}
}

export class SetReceiptFilter {
  static readonly type = "[ReceiptTable] Set Filter";

  constructor(public data: ReceiptPagedRequestFilter) {}
}

export class ResetReceiptFilter {
  static readonly type = "[ReceiptTable] Reset Filter";

  constructor() {}
}

export class SetColumnConfig {
  static readonly type = "[ReceiptTable] Set Column Config";

  constructor(public columnConfig: ReceiptTableColumnConfig[]) {}
}
