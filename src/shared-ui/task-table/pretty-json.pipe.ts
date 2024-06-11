import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { prettyPrintJson } from "pretty-print-json";
import { DEFAULT_PRETTY_JSON_OPTIONS } from "../../receipt-processing-settings/constants/pretty-json";

@Pipe({
  name: "prettyJson"
})
export class PrettyJsonPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}


  public transform(resultDescription?: string, verticalJson = true): SafeHtml {
    if (!resultDescription) {
      return "";
    }
    let options = {};
    if (verticalJson) {
      options = DEFAULT_PRETTY_JSON_OPTIONS;
    }

    try {
      const cleanedJsonString = this.getCleanedJsonString(resultDescription);
      const json = JSON.parse(cleanedJsonString);

      const dirtyHtml = prettyPrintJson.toHtml(json, options);
      return this.sanitizer.bypassSecurityTrustHtml(dirtyHtml);
    } catch (e) {
      return "";
    }
  }

  private getCleanedJsonString(resultDescription: string): string {
    let parsedJson = JSON.parse(resultDescription);
    let jsonString = JSON.stringify(parsedJson);

    jsonString = jsonString.replace(/\\t/g, "");
    jsonString = jsonString.replace(/\\n/g, "");
    jsonString = jsonString.replace(/\\/g, "");
    jsonString = jsonString.replace(/"{/g, "{");
    jsonString = jsonString.replace(/}"/g, "}");

    return jsonString;
  }
}
