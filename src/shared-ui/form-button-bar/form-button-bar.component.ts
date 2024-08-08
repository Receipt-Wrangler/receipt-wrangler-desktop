import { Component, Input } from "@angular/core";
import { FormMode } from "src/enums/form-mode.enum";

@Component({
  selector: "app-form-button-bar",
  templateUrl: "./form-button-bar.component.html",
  styleUrls: ["./form-button-bar.component.scss"],
})
export class FormButtonBarComponent {
  @Input() public mode?: FormMode;

  @Input() public justifyContentEnd = true;

  public formMode = FormMode;
}
