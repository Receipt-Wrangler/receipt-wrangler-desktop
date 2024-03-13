import { Component } from "@angular/core";
import { BaseInputComponent } from "../../base-input";
import { InputInterface } from "../../input";


@Component({
  selector: "app-textarea",
  templateUrl: "./textarea.component.html",
  styleUrls: ["./textarea.component.scss"],
})
export class TextareaComponent
  extends BaseInputComponent
  implements InputInterface {}
