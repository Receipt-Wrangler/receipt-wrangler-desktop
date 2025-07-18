import {
  Component,
  ElementRef,
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
import { FormArray, FormGroup, } from "@angular/forms";
import { MatExpansionPanel } from "@angular/material/expansion";
import { ActivatedRoute } from "@angular/router";
import { FormMode } from "src/enums/form-mode.enum";
import { InputComponent } from "../../input";
import { Category, Group, GroupRole, Item, Receipt, Tag } from "../../open-api";
import { buildItemForm } from "../utils/form.utils";

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

  @ViewChild("addForm")
  public addForm!: ElementRef;

  @ViewChild("nameInput")
  public nameInput!: InputComponent;

  @ViewChild("amountInput")
  public amountInput!: InputComponent;

  @ViewChild("categoryInput")
  public categoryInput!: ElementRef;

  @ViewChild("tagInput")
  public tagInput!: ElementRef;

  @Input() public form!: FormGroup;

  @Input() public originalReceipt?: Receipt;

  @Input() public categories: Category[] = [];

  @Input() public tags: Tag[] = [];

  @Input() public selectedGroup: Group | undefined;

  @Input() public triggerAddMode: boolean = false;

  @Output() public itemAdded = new EventEmitter<Item>();

  @Output() public itemRemoved = new EventEmitter<{ item: Item; arrayIndex: number }>();

  public newItemFormGroup: FormGroup = new FormGroup({});

  public items: ItemData[] = [];

  public isAdding: boolean = false;

  public mode: FormMode = FormMode.view;

  public formMode = FormMode;

  public groupRole = GroupRole;

  public rapidAddMode: boolean = false;

  public showKeyboardHint: boolean = false;

  private keyboardHintTimeout: any;

  public get receiptItems(): FormArray {
    return this.form.get("receiptItems") as FormArray;
  }

  constructor(
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.originalReceipt = this.activatedRoute.snapshot.data["receipt"];
    this.mode = this.activatedRoute.snapshot.data["mode"];
    this.setItems();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes["triggerAddMode"] && changes["triggerAddMode"].currentValue) {
      this.startAddMode();
    }
    if (changes["form"]) {
      this.setItems();
    }
  }

  @HostListener('document:keydown', ['$event'])
  public handleKeyboardShortcut(event: KeyboardEvent): void {
    // Ctrl+I to add item
    if (event.ctrlKey && event.key === 'i' && !this.isAdding) {
      event.preventDefault();
      this.startAddMode();
    }
    
    // Show keyboard hint briefly
    if (event.ctrlKey && event.key === 'i') {
      this.showKeyboardHint = true;
      clearTimeout(this.keyboardHintTimeout);
      this.keyboardHintTimeout = setTimeout(() => {
        this.showKeyboardHint = false;
      }, 2000);
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
    this.rapidAddMode = false;
    this.newItemFormGroup = buildItemForm(
      undefined,
      this.originalReceipt?.id?.toString(),
      false
    );
    
    // Auto-expand accordion if collapsed
    if (this.itemsExpansionPanel && !this.itemsExpansionPanel.expanded) {
      this.itemsExpansionPanel.open();
    }
    
    // Auto-focus name field after view update
    setTimeout(() => {
      this.focusNameField();
      this.scrollToAddForm();
    }, 50);
  }

  public initAddMode(): void {
    // Legacy method for backward compatibility
    this.startAddMode();
  }

  public exitAddMode(): void {
    this.isAdding = false;
    this.rapidAddMode = false;
    this.newItemFormGroup = new FormGroup({});
  }

  public cancelAddMode(): void {
    this.exitAddMode();
  }

  public submitNewItemFormGroup(): void {
    if (this.newItemFormGroup.valid) {
      const newItem = this.newItemFormGroup.value as Item;
      newItem.chargedToUserId = undefined;
      this.itemAdded.emit(newItem);
      this.exitAddMode();
    }
  }

  public submitAndContinue(): void {
    if (this.newItemFormGroup.valid) {
      const newItem = this.newItemFormGroup.value as Item;
      newItem.chargedToUserId = undefined;
      this.itemAdded.emit(newItem);
      
      // Reset form but stay in add mode
      this.rapidAddMode = true;
      this.newItemFormGroup = buildItemForm(
        undefined,
        this.originalReceipt?.id?.toString(),
        false
      );
      
      // Ensure accordion stays expanded during rapid add mode
      if (this.itemsExpansionPanel && !this.itemsExpansionPanel.expanded) {
        this.itemsExpansionPanel.open();
      }
      
      // Re-focus name field
      setTimeout(() => {
        this.focusNameField();
      }, 50);
    }
  }

  public submitAndFinish(): void {
    if (this.newItemFormGroup.valid) {
      const newItem = this.newItemFormGroup.value as Item;
      newItem.chargedToUserId = undefined;
      this.itemAdded.emit(newItem);
      this.exitAddMode();
    }
  }

  public removeItem(itemData: ItemData): void {
    this.itemRemoved.emit({ item: itemData.item, arrayIndex: itemData.arrayIndex });
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

  // Keyboard event handlers
  public onNameEnter(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    this.focusAmountField();
  }

  public onAmountEnter(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    if (this.selectedGroup?.groupReceiptSettings?.hideItemCategories) {
      if (this.selectedGroup?.groupReceiptSettings?.hideItemTags) {
        this.submitAndContinue();
      } else {
        this.focusTagField();
      }
    } else {
      this.focusCategoryField();
    }
  }

  public onCategoryEnter(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    if (this.selectedGroup?.groupReceiptSettings?.hideItemTags) {
      this.submitAndContinue();
    } else {
      this.focusTagField();
    }
  }

  public onTagEnter(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    this.submitAndContinue();
  }

  // Focus management
  private focusNameField(): void {
    if (this.nameInput?.nativeInput?.nativeElement) {
      (this.nameInput.nativeInput.nativeElement as HTMLInputElement).focus();
    }
  }

  private focusAmountField(): void {
    if (this.amountInput?.nativeInput?.nativeElement) {
      (this.amountInput.nativeInput.nativeElement as HTMLInputElement).focus();
    }
  }

  private focusCategoryField(): void {
    if (this.categoryInput?.nativeElement) {
      const input = this.categoryInput.nativeElement.querySelector('input');
      if (input) input.focus();
    }
  }

  private focusTagField(): void {
    if (this.tagInput?.nativeElement) {
      const input = this.tagInput.nativeElement.querySelector('input');
      if (input) input.focus();
    }
  }

  private scrollToAddForm(): void {
    if (this.addForm?.nativeElement) {
      this.addForm.nativeElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }

  ngOnDestroy(): void {
    if (this.keyboardHintTimeout) {
      clearTimeout(this.keyboardHintTimeout);
    }
  }
}
