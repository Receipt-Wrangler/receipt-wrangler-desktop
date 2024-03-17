import { Component, Input, TemplateRef } from "@angular/core";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent {
  @Input() public headerText: string = "";

  @Input() public actionsTemplate?: TemplateRef<any>;
}
