import { registerLocaleData } from "@angular/common";
import localeAr from "@angular/common/locales/ar";
import localeDa from "@angular/common/locales/da";
import localeDe from "@angular/common/locales/de";

import localeEnUs from "@angular/common/locales/en";
import localeEnGb from "@angular/common/locales/en-GB";
import localeEs from "@angular/common/locales/es";
import localeFi from "@angular/common/locales/fi";
import localeFr from "@angular/common/locales/fr";
import localeHe from "@angular/common/locales/he";
import localeHi from "@angular/common/locales/hi";
import localeIt from "@angular/common/locales/it";
import localeJa from "@angular/common/locales/ja";
import localeKo from "@angular/common/locales/ko";
import localeNo from "@angular/common/locales/nb";
import localeNl from "@angular/common/locales/nl";
import localePl from "@angular/common/locales/pl";
import localePtBr from "@angular/common/locales/pt";
import localePtPt from "@angular/common/locales/pt-PT";
import localeRu from "@angular/common/locales/ru";
import localeSv from "@angular/common/locales/sv";
import localeTh from "@angular/common/locales/th";
import localeTr from "@angular/common/locales/tr";
import localeVi from "@angular/common/locales/vi";
import localeZhCn from "@angular/common/locales/zh";
import localeZhTw from "@angular/common/locales/zh-Hant";
import { NgModule } from "@angular/core";

// TODO: in system settings, users need to be able to set currency locale, show symbol, or currency code and currency code.

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class LocaleModule {
  constructor() {
    registerLocaleData(localeEnUs, "en-US");
    registerLocaleData(localeEnGb, "en-GB");
    registerLocaleData(localeFr, "fr-FR");
    registerLocaleData(localeDe, "de-DE");
    registerLocaleData(localeEs, "es-ES");
    registerLocaleData(localeIt, "it-IT");
    registerLocaleData(localeJa, "ja-JP");
    registerLocaleData(localeZhCn, "zh-CN");
    registerLocaleData(localeZhTw, "zh-TW");
    registerLocaleData(localeRu, "ru-RU");
    registerLocaleData(localePtBr, "pt-BR");
    registerLocaleData(localePtPt, "pt-PT");
    registerLocaleData(localeAr, "ar-SA");
    registerLocaleData(localeHi, "hi-IN");
    registerLocaleData(localeKo, "ko-KR");
    registerLocaleData(localeNl, "nl-NL");
    registerLocaleData(localePl, "pl-PL");
    registerLocaleData(localeSv, "sv-SE");
    registerLocaleData(localeTr, "tr-TR");
    registerLocaleData(localeDa, "da-DK");
    registerLocaleData(localeFi, "fi-FI");
    registerLocaleData(localeNo, "no-NO");
    registerLocaleData(localeHe, "he-IL");
    registerLocaleData(localeTh, "th-TH");
    registerLocaleData(localeVi, "vi-VN");
  }
}
