import { Component, Input, OnInit } from "@angular/core";
import { BaseInputComponent } from "../../base-input";

@Component({
  selector: "app-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"],
})
export class SelectComponent extends BaseInputComponent implements OnInit {
  @Input() public options: any[] = [];

  @Input() public optionsDisplayArray: any[] = [];

  @Input() public optionValueKey: string = "";

  @Input() public optionDisplayKey: string = "";

  constructor() {
    super();
  }

  public override ngOnInit(): void {
    super.ngOnInit();
  }
}
