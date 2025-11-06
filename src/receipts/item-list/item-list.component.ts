import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatExpansionPanel } from "@angular/material/expansion";
import { ActivatedRoute } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { DEFAULT_DIALOG_CONFIG } from "src/constants";
import { FormMode } from "src/enums/form-mode.enum";
import { KEYBOARD_SHORTCUT_ACTIONS } from "../../constants/keyboard-shortcuts.constant";
import { InputComponent } from "../../input";
import { Category, CustomField, CustomFieldValue, Group, GroupRole, Item, Receipt, Tag } from "../../open-api";
import { KeyboardShortcutService } from "../../services/keyboard-shortcut.service";
import { StatefulMenuItem } from "../../standalone/components/filtered-stateful-menu/stateful-menu-item";
import { QuickActionsDialogComponent } from "../quick-actions-dialog/quick-actions-dialog.component";

export interface ItemData {
  item: Item;
  arrayIndex: number;
}

@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class ItemListComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild("itemsExpansionPanel")
  public itemsExpansionPanel!: MatExpansionPanel;

  @ViewChildren("nameField")
  public nameFields!: QueryList<InputComponent>;


  @Input() public form!: FormGroup;

  @Input() public originalReceipt?: Receipt;

  @Input() public categories: Category[] = [];

  @Input() public tags: Tag[] = [];

  @Input() public customFields: CustomField[] = [];

  @Input() public selectedGroup: Group | undefined;

  @Input() public triggerAddMode: boolean = false;

  @Output() public itemAdded = new EventEmitter<Item>();

  @Output() public itemRemoved = new EventEmitter<{ item: Item; arrayIndex: number }>();

  @Output() public itemSplit = new EventEmitter<{ items: Item[], itemIndex: number }>();


  public items: ItemData[] = [];

  public isAdding: boolean = false;

  public mode: FormMode = FormMode.view;

  public formMode = FormMode;

  public groupRole = GroupRole;


  private destroy$ = new Subject<void>();

  public get receiptItems(): FormArray {
    return this.form.get("receiptItems") as FormArray;
  }

  public getItemCustomFields(arrayIndex: number): FormArray {
    const itemFormGroup = this.receiptItems.at(arrayIndex) as FormGroup;
    return itemFormGroup.get("customFields") as FormArray;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private keyboardShortcutService: KeyboardShortcutService,
    private matDialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.originalReceipt = this.activatedRoute.snapshot.data["receipt"];
    this.mode = this.activatedRoute.snapshot.data["mode"];
    this.setItems();
    this.setupKeyboardShortcuts();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes["triggerAddMode"] && changes["triggerAddMode"].currentValue) {
      this.startAddMode();
    }
    if (changes["form"]) {
      this.setItems();
    }
  }

  @HostListener("document:keydown", ["$event"])
  public handleKeyboardShortcut(event: KeyboardEvent): void {
    // Only handle shortcuts when in edit mode or when specifically allowed
    if (this.mode === FormMode.view && !this.isAdding) {
      return;
    }

    // Let the service handle the keyboard event
    this.keyboardShortcutService.handleKeyboardEvent(event);
  }

  private setupKeyboardShortcuts(): void {
    // Subscribe to keyboard shortcut events
    this.keyboardShortcutService.shortcutTriggered
      .pipe(takeUntil(this.destroy$))
      .subscribe(shortcutEvent => {
        this.handleShortcutAction(shortcutEvent.action);
      });
  }

  private handleShortcutAction(action: string): void {
    switch (action) {
      case KEYBOARD_SHORTCUT_ACTIONS.ADD_ITEM:
        if (!this.isAdding) {
          this.startAddMode();
        }
        break;
    }
  }

  public setItems(): void {
    const receiptItems = this.form.get("receiptItems");
    if (receiptItems) {
      const items = this.form.get("receiptItems")?.value as Item[];
      const itemDataArray: ItemData[] = [];

      if (items?.length > 0) {
        items.forEach((item, index) => {
          if (!item?.chargedToUserId) {
            const itemData: ItemData = {
              item: item,
              arrayIndex: index,
            };
            itemDataArray.push(itemData);
          }
        });
      }
      this.items = itemDataArray;
    }
  }

  public startAddMode(): void {
    this.isAdding = true;

    // Auto-expand accordion if collapsed
    if (this.itemsExpansionPanel && !this.itemsExpansionPanel.expanded) {
      this.itemsExpansionPanel.open();
    }
  }

  public initAddMode(): void {
    // Legacy method for backward compatibility
    this.startAddMode();
  }

  // Event handlers for the item-add-form component
  public onItemSubmitAndContinue(item: Item): void {
    this.itemAdded.emit(item);
    // Form component handles its own reset for rapid mode
  }

  public onItemSubmitAndFinish(item: Item): void {
    this.itemAdded.emit(item);
    this.isAdding = false;
  }

  public onItemCancelled(): void {
    this.isAdding = false;
  }

  public removeItem(itemData: ItemData): void {
    this.itemRemoved.emit({ item: itemData.item, arrayIndex: itemData.arrayIndex });
  }

  public splitItem(itemData: ItemData): void {
    const dialogRef = this.matDialog.open(QuickActionsDialogComponent, {
      ...DEFAULT_DIALOG_CONFIG,
      data: {
        originalReceipt: this.originalReceipt,
        amountToSplit: parseFloat(itemData.item.amount) || 0,
        itemIndex: itemData.arrayIndex,
        usersToOmit: []
      }
    });

    // Pass data directly to component since it uses @Input decorators
    dialogRef.componentInstance.originalReceipt = this.originalReceipt;
    dialogRef.componentInstance.amountToSplit = parseFloat(itemData.item.amount) || 0;
    dialogRef.componentInstance.itemIndex = itemData.arrayIndex;
    dialogRef.componentInstance.usersToOmit = [];

    // Subscribe to the component's itemsToAdd output
    dialogRef.componentInstance.itemsToAdd.subscribe((data: { items: Item[], itemIndex?: number }) => {
      if (data.itemIndex !== undefined) {
        this.itemSplit.emit({ items: data.items, itemIndex: data.itemIndex });
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      // Dialog closed
    });
  }

  public addInlineItem(event?: MouseEvent): void {
    if (event) {
      event?.stopImmediatePropagation();
    }

    if (this.mode !== FormMode.view) {
      const newItem = {
        name: "",
        chargedToUserId: undefined,
      } as Item;
      this.itemAdded.emit(newItem);
    }
  }

  public addInlineItemOnBlur(index: number): void {
    if (this.items && this.items.length - 1 === index) {
      const item = this.items.at(index) as ItemData;
      const itemInput = this.receiptItems.at(item?.arrayIndex);
      if (itemInput.valid) {
        this.addInlineItem();
      }
    }
  }

  public checkLastInlineItem(): void {
    if (this.mode !== FormMode.view) {
      if (this.items && this.items.length > 1) {
        const lastItem = this.items[this.items.length - 1];
        const formGroup = this.receiptItems.at(lastItem.arrayIndex);
        const nameValue = formGroup.get("name")?.value;
        const amountValue = formGroup.get("amount")?.value;

        if (formGroup.pristine && (!nameValue || nameValue.trim() === "") && (!amountValue || amountValue === 0)) {
          this.itemRemoved.emit({ item: lastItem.item, arrayIndex: lastItem.arrayIndex });
        }
      }
    }
  }

  public getTotalAmount(): number {
    if (!this.items || this.items.length === 0) {
      return 0;
    }

    return this.items.reduce((total, itemData) => {
      const amount = parseFloat(itemData.item.amount) || 0;
      return total + amount;
    }, 0);
  }

  public customFieldChanged(item: StatefulMenuItem, itemData: ItemData): void {
    const itemFormGroup = this.receiptItems.at(itemData.arrayIndex) as FormGroup;
    const customFieldsArray = itemFormGroup.get("customFields") as FormArray;

    // Custom field was just selected (toggled from unselected to selected)
    if (item.selected) {
      const customField = this.customFields.find(cf => cf.id === Number(item.value));
      if (customField) {
        const customFieldValue = {
          customFieldId: customField.id,
          receiptId: null,
          value: null
        } as any as CustomFieldValue;
        const formGroup = new FormGroup({
          receiptId: new FormControl(null),
          customFieldId: new FormControl(customFieldValue.customFieldId),
          stringValue: new FormControl(customFieldValue?.stringValue ?? null),
          dateValue: new FormControl(customFieldValue?.dateValue ?? null),
          selectValue: new FormControl(customFieldValue?.selectValue ?? null),
          currencyValue: new FormControl(customFieldValue?.currencyValue ?? null),
          booleanValue: new FormControl(customFieldValue?.booleanValue ?? false),
        });
        customFieldsArray.push(formGroup);
      }
    } else {
      // Custom field was just removed (toggled from selected to unselected)
      const formArrayIndex = customFieldsArray.controls.findIndex(
        control => control.value?.["customFieldId"]?.toString() === item.value
      );
      if (formArrayIndex >= 0) {
        customFieldsArray.removeAt(formArrayIndex);
      }
    }
  }

  // Keyboard event handlers

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.keyboardShortcutService.clearHintTimeout();
  }
}
