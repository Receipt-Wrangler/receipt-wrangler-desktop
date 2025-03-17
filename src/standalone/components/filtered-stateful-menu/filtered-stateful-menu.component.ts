import { CdkMenu, CdkMenuGroup, CdkMenuItemRadio, CdkMenuTrigger } from "@angular/cdk/menu";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BaseButtonComponent } from "../../../button/base-button/base-button.component";
import { ButtonModule } from "../../../button/index";
import { StatefulMenuItem } from "./stateful-menu-item";

@Component({
  selector: "app-filtered-stateful-menu",
  imports: [
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuGroup,
    CdkMenuItemRadio, ButtonModule,
  ],
  templateUrl: "./filtered-stateful-menu.component.html",
  styleUrl: "./filtered-stateful-menu.component.scss"
})
export class FilteredStatefulMenuComponent extends BaseButtonComponent {
  @Input() public items: StatefulMenuItem[] = [];

  @Output() public itemSelected = new EventEmitter<StatefulMenuItem>();

  public onItemSelected(item: StatefulMenuItem) {
    item.selected = true;

    this.itemSelected.emit(item);
  }
}
