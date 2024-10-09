export class SetCurrencyDisplay {
  static readonly type = "[SystemSettingsState] Set Currency Display";

  constructor(public currencyDisplay: string) {}
}

export class SetCurrencyData {
  static readonly type = "[SystemSettingsState] Set Currency Data";

  constructor(
    public currencyLocale: string,
    public currencyCode: string,
    public showCurrencySymbol: boolean
  ) {}
}

