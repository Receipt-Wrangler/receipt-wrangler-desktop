export class SetCurrencyDisplay {
  static readonly type = "[SystemSettingsState] Set Currency Display";

  constructor(public currencyDisplay: string) {}
}

export class SetCurrencyData {
  static readonly type = "[SystemSettingsState] Set Currency Data";

  constructor(
    public currencySymbolPosition: string,
    public currencyDecimalSeparator: string,
    public currencyThousandthsSeparator: string,
  ) {}
}

