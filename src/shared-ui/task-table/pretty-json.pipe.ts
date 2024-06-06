import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { prettyPrintJson } from "pretty-print-json";
import { DEFAULT_PRETTY_JSON_OPTIONS } from "../../receipt-processing-settings/constants/pretty-json";

@Pipe({
  name: "prettyJson"
})
export class PrettyJsonPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }


  public transform(resultDescription?: string, verticalJson = true): SafeHtml {
    let json = {};

    if (!resultDescription) {
      return "";
    }
    let options = {};
    if (verticalJson) {
      options = DEFAULT_PRETTY_JSON_OPTIONS;
    }

    try {
      json = JSON.parse(resultDescription);
    } catch (e) {
      return "";
    }

    const dirtyHtml = prettyPrintJson.toHtml(json, options);
    return this.sanitizer.bypassSecurityTrustHtml(dirtyHtml);
  }
}
