import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatExpansionPanel } from "@angular/material/expansion";
import { RECEIPT_ITEM_STATUS_OPTIONS } from "src/constants/receipt-status-options";
import { FormMode } from "../../enums/form-mode.enum";
import { Category, Group, GroupRole, Receipt, Tag } from "../../open-api/index";
import { ItemData } from "../share-list/share-list.component";

@Component({
  selector: "app-item-accordion",
  standalone: false,
  templateUrl: "./item-accordion.component.html",
  styleUrl: "./item-accordion.component.scss"
})
export class ItemAccordionComponent {
  @ViewChild(MatExpansionPanel)
  public expansionPanel!: MatExpansionPanel;

  @Input() itemData: ItemData[] = [];

  @Input() public mode!: FormMode;

  @Input() public form!: FormGroup;

  @Input() public categories: Category[] = [];

  @Input() public tags: Tag[] = [];

  @Input() public key?: string;

  @Input() public originalReceipt?: Receipt;

  @Input() public selectedGroup: Group | undefined;

  @Output() public opened = new EventEmitter<string>();

  @Output() public closed = new EventEmitter<string>();

  @Output() public removed = new EventEmitter<ItemData>();

  @Output() public allItemsResolved = new EventEmitter<{
    event: MouseEvent,
    key: string
  }>();

  @Output() public fieldBlurred = new EventEmitter<{
    key?: string;
    index: number;
  }>();

  public itemStatusOptions = RECEIPT_ITEM_STATUS_OPTIONS;

  public groupRole = GroupRole;

  public formMode = FormMode;

  public onOpened(): void {
    this.opened.emit(this.key ?? "");
  }

  public onClosed(): void {
    this.closed.emit(this.key ?? "");
  }

  public onRemoved(data: ItemData): void {
    this.removed.emit(data);
  }

  public onFieldBlur(key?: string, index: number = 0): void {
    this.fieldBlurred.emit({
      key,
      index
    });
  }

  public allItemsResolvedHandler(event: MouseEvent, key?: string): void {
    this.allItemsResolved.emit({
      event: event,
      key: key ?? ""
    });
  }

  // TODO: implement or buble event
  public allUserItemsResolved(key?: string): boolean {
    return false;
  }
}
