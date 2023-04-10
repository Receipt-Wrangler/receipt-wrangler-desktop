export class SetPage {
  static readonly type = '[ReceiptTable] Set Page';

  constructor(public page: number) {}
}

export class SetPageSize {
  static readonly type = '[ReceiptTable] Set Page Size';

  constructor(public pageSize: number) {}
}
