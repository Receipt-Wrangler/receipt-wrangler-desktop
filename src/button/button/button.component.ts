import { Component, EventEmitter, Input, Output, ViewEncapsulation, } from "@angular/core";
import { ThemePalette } from "@angular/material/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  @Input() public buttonClass: string = "";

  @Input() public color: string = "primary";

  @Input() public buttonText: string = "";

  @Input() public type: "button" | "menu" | "submit" | "reset" = "button";

  @Input() public matButtonType: "matRaisedButton" | "iconButton" | "basic" =
    "matRaisedButton";

  @Input() public icon: string = "";

  @Input() public customIcon: string = "";

  @Input() public disabled: boolean = false;

  @Input() public buttonRouterLink: string[] = [];

  @Input() public tooltip: string = "";

  @Input() public matBadgeContent?: any;

  @Input() public matBadgeColor: ThemePalette = "primary";

  @Output() public clicked: EventEmitter<MouseEvent> =
    new EventEmitter<MouseEvent>();

  public emitClicked(event: MouseEvent): void {
    this.clicked.emit(event);
  }
}
