import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { prettyPrintJson } from "pretty-print-json";

@Pipe({
  name: "prettyJson"
})
export class PrettyJsonPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }


  public transform(resultDescription: string): SafeHtml {
    const json = JSON.parse(resultDescription);
    const dirtyHtml = prettyPrintJson.toHtml(json, {
      lineNumbers: true,
    });
    return this.sanitizer.bypassSecurityTrustHtml(dirtyHtml);
  }

}
