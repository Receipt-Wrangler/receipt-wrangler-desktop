import { Pipe, PipeTransform } from "@angular/core";
import { SystemTaskType } from "../../open-api";

@Pipe({
  name: "systemTaskType",
  standalone: true
})
export class SystemTaskTypePipe implements PipeTransform {

  public transform(value: SystemTaskType): string {
    switch (value) {
      case "SYSTEM_EMAIL_CONNECTIVITY_CHECK":
        return "System Email Connectivity Check";
      case "RECEIPT_PROCESSING_SETTINGS_CONNECTIVITY_CHECK":
        return "Receipt Processing Settings Connectivity Check";
    }
  }
}
