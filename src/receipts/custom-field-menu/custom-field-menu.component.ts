import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CustomField, CustomFieldValue } from "../../open-api";
import { CustomFieldTypePipe } from "../../pipes/custom-field-type.pipe";
import { StatefulMenuItem } from "../../standalone/components/filtered-stateful-menu/stateful-menu-item";

@Component({
  selector: "app-custom-field-menu",
  templateUrl: "./custom-field-menu.component.html",
  styleUrls: ["./custom-field-menu.component.scss"],
  providers: [CustomFieldTypePipe],
  standalone: false
})
export class CustomFieldMenuComponent implements OnInit {
  @Input() public customFields: CustomField[] = [];

  @Input() public selectedCustomFields: CustomFieldValue[] = [];

  @Input() public readonly: boolean = false;

  @Input() public matButtonType: "matRaisedButton" | "iconButton" | "basic" = "iconButton";

  @Input() public icon: string = "list_alt";

  @Input() public tooltip: string = "Manage custom fields";

  @Input() public color: "primary" | "accent" | "warn" = "accent";

  @Input() public headerText: string = "";

  @Output() public customFieldChanged = new EventEmitter<StatefulMenuItem>();

  public customFieldsStatefulMenuItems: StatefulMenuItem[] = [];

  constructor(private customFieldTypePipe: CustomFieldTypePipe) {}

  public ngOnInit(): void {
    this.initializeMenuItems();
    this.setHeaderText();
  }

  private initializeMenuItems(): void {
    this.customFieldsStatefulMenuItems = this.customFields.map(c => {
      const selected = this.selectedCustomFields.some(customField => customField.customFieldId === c.id) ?? false;

      return {
        value: c.id.toString(),
        subtitle: this.customFieldTypePipe.transform(c.type),
        displayValue: c.name,
        selected: selected
      };
    });
  }

  private setHeaderText(): void {
    if (!this.headerText) {
      this.headerText = this.readonly ? "View Custom Fields" : "Edit Custom Fields";
    }
  }

  public onCustomFieldChanged(item: StatefulMenuItem): void {
    const newCustomFields = Array.from(this.customFieldsStatefulMenuItems);
    const selectedItemIndex = this.customFieldsStatefulMenuItems.findIndex(customField => customField.value === item.value);

    newCustomFields[selectedItemIndex] = {
      ...item,
      selected: !item.selected
    };

    this.customFieldsStatefulMenuItems = newCustomFields;
    this.customFieldChanged.emit(newCustomFields[selectedItemIndex]);
  }
}
