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


  public transform(resultDescription?: string): SafeHtml {
    if (!resultDescription) {
      return "";
    }

    const json = JSON.parse(resultDescription);
    const dirtyHtml = prettyPrintJson.toHtml(json, DEFAULT_PRETTY_JSON_OPTIONS);
    return this.sanitizer.bypassSecurityTrustHtml(dirtyHtml);
  }

}
