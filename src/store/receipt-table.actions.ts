import { ReceiptTableInterface } from '../interfaces';

export class SetPage {
  static readonly type = '[ReceiptTable] Set Page';

  constructor(public page: number) {}
}

export class SetPageSize {
  static readonly type = '[ReceiptTable] Set Page Size';

  constructor(public pageSize: number) {}
}

export class SetReceiptFilterData {
  static readonly type = '[ReceiptTable] Set Filter Data';

  constructor(public data: ReceiptTableInterface) {}
}
