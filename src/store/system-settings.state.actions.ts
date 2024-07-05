export class SetCurrencyDisplay {
  static readonly type = "[SystemSettingsState] Set Currency Display";

  constructor(public currencyDisplay: string) {}
}

