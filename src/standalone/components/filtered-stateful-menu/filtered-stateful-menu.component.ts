import { CdkMenu, CdkMenuTrigger } from "@angular/cdk/menu";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatMenuItem } from "@angular/material/menu";
import { BaseButtonComponent } from "../../../button/base-button/base-button.component";
import { ButtonModule } from "../../../button/index";
import { InputModule } from "../../../input/index";
import { StatefulMenuItem } from "./stateful-menu-item";

@Component({
  selector: "app-filtered-stateful-menu",
  imports: [
    CdkMenuTrigger,
    CdkMenu,
    ButtonModule, InputModule, MatMenuItem, MatCheckbox,
  ],
  templateUrl: "./filtered-stateful-menu.component.html",
  styleUrl: "./filtered-stateful-menu.component.scss"
})
export class FilteredStatefulMenuComponent extends BaseButtonComponent {
  @Input() public items: StatefulMenuItem[] = [];

  @Output() public itemSelected = new EventEmitter<StatefulMenuItem>();

  public filterFormControl = new FormControl();

  public onItemSelected(item: StatefulMenuItem, event: MouseEvent) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    this.itemSelected.emit(item);
  }
}
