import { Component } from "@angular/core";
import { BaseInputComponent } from "../../base-input";

@Component({
  selector: "app-datepicker",
  templateUrl: "./datepicker.component.html",
  styleUrls: ["./datepicker.component.scss"],
})
export class DatepickerComponent extends BaseInputComponent {}
