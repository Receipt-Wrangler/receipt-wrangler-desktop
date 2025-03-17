import { CdkMenu, CdkMenuGroup, CdkMenuItemRadio, CdkMenuTrigger } from "@angular/cdk/menu";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { StatefulMenuItem } from "./stateful-menu-item";

@Component({
  selector: "app-filtered-stateful-menu",
  imports: [CdkMenuTrigger,
    CdkMenu,
    CdkMenuGroup,
    CdkMenuItemRadio,
  ],
  templateUrl: "./filtered-stateful-menu.component.html",
  styleUrl: "./filtered-stateful-menu.component.scss"
})
export class FilteredStatefulMenuComponent {
  @Input() public items: StatefulMenuItem[] = [];

  @Output() public itemSelected = new EventEmitter<StatefulMenuItem>();

  public onItemSelected(item: StatefulMenuItem) {
    item.selected = true;

    this.itemSelected.emit(item);
  }
}
