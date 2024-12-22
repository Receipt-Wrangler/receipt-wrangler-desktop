import { ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChildren, ViewEncapsulation, } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormGroup, } from "@angular/forms";
import { MatExpansionPanel } from "@angular/material/expansion";
import { ActivatedRoute } from "@angular/router";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { RECEIPT_ITEM_STATUS_OPTIONS } from "src/constants/receipt-status-options";
import { FormMode } from "src/enums/form-mode.enum";
import { InputComponent } from "../../input";
import { Category, GroupRole, Item, ItemStatus, Receipt, Tag, User } from "../../open-api";
import { UserState } from "../../store";
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
})
export class ItemListComponent implements OnInit {
  @ViewChildren("userExpansionPanel")
  public userExpansionPanels!: QueryList<MatExpansionPanel>;

  @ViewChildren("nameField")
  public nameFields!: QueryList<InputComponent>;

  @Select(UserState.users) public users!: Observable<User[]>;

  @Input() public form!: FormGroup;

  @Input() public originalReceipt?: Receipt;

  @Input() public categories: Category[] = [];

  @Input() public tags: Tag[] = [];

  public newItemFormGroup: FormGroup = new FormGroup({});

  public userItemMap: Map<string, ItemData[]> = new Map<string, ItemData[]>();

  public isAdding: boolean = false;

  public mode: FormMode = FormMode.view;

  public formMode = FormMode;

  public groupRole = GroupRole;

  public itemStatusOptions = RECEIPT_ITEM_STATUS_OPTIONS;

  public get receiptItems(): FormArray {
    return this.form.get("receiptItems") as FormArray;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.originalReceipt = this.activatedRoute.snapshot.data["receipt"];
    this.mode = this.activatedRoute.snapshot.data["mode"];
    this.initForm();
    this.setUserItemMap();
  }

  private initForm(): void {
    this.form.addControl(
      "receiptItems",
      this.formBuilder.array(
        this.originalReceipt?.receiptItems
          ? this.originalReceipt.receiptItems.map((item) =>
            buildItemForm(item, this.originalReceipt?.id?.toString())
          )
          : []
      )
    );
  }

  public setUserItemMap(): void {
    const receiptItems = this.form.get("receiptItems");
    if (receiptItems) {
      const items = this.form.get("receiptItems")?.value as Item[];
      const map = new Map<string, ItemData[]>();

      if (items?.length > 0) {
        items.forEach((item, index) => {
          const chargedToUserId = item.chargedToUserId.toString();
          const itemData: ItemData = {
            item: item,
            arrayIndex: index,
          };

          if (map.has(chargedToUserId)) {
            const newItems = Array.from(map.get(chargedToUserId) as ItemData[]);
            newItems.push(itemData);
            map.set(chargedToUserId, newItems);
          } else {
            map.set(chargedToUserId, [itemData]);
          }
        });
      }
      this.userItemMap = map;
    }
  }

  public initAddMode(): void {
    this.isAdding = true;
    this.newItemFormGroup = buildItemForm(
      undefined,
      this.originalReceipt?.id?.toString()
    );
  }

  public exitAddMode(): void {
    this.isAdding = false;
    this.newItemFormGroup = new FormGroup({});
  }

  public submitNewItemFormGroup(): void {
    if (this.newItemFormGroup.valid) {
      const formArray = this.form.get("receiptItems") as FormArray;
      formArray.push(this.newItemFormGroup);
      this.exitAddMode();
      this.setUserItemMap();
    }
  }

  public removeItem(itemData: ItemData): void {
    const formArray = this.form.get("receiptItems") as FormArray;
    formArray.removeAt(itemData.arrayIndex);
    this.setUserItemMap();
  }

  public addInlineItem(userId: string): void {
    if (this.mode !== FormMode.view) {
      this.receiptItems.push(
        buildItemForm(
          {
            name: "",
            chargedToUserId: Number(userId),
          } as Item,
          this.originalReceipt?.id?.toString()
        )
      );
      this.setUserItemMap();
    }
  }

  public addInlineItemOnBlur(userId: string, index: number): void {
    const userItems = this.userItemMap.get(userId);
    if (userItems && userItems.length - 1 === index) {
      const item = userItems.at(index) as ItemData;
      const itemInput = this.receiptItems.at(item?.arrayIndex).value;
      if (itemInput.name && itemInput.amount) {
        this.addInlineItem(userId);
        this.cdr.detectChanges();
        document.getElementById(`name-${index + 1}`)?.focus();
      }
    }
  }

  public checkLastInlineItem(userId: string): void {
    if (this.mode !== FormMode.view) {
      const items = this.userItemMap.get(userId);
      if (items) {
        const lastItem = items[items.length - 1];
        const formGroup = this.receiptItems.at(lastItem.arrayIndex);
        if (formGroup.pristine) {
          this.receiptItems.removeAt(lastItem.arrayIndex);
          this.setUserItemMap();
        }
      }
    }
  }

  public resolveAllItemsClicked(event: MouseEvent, userId: string): void {
    event.stopImmediatePropagation();
    const filtered = this.getItemsForUser(userId);

    filtered.forEach((i) =>
      i.patchValue({
        status: ItemStatus.Resolved,
      })
    );
  }

  public allUserItemsResolved(userId: string): boolean {
    const userItems = this.getItemsForUser(userId);
    return userItems.every(
      (i) => i.get("status")?.value === ItemStatus.Resolved
    );
  }

  private getItemsForUser(userId: string): AbstractControl[] {
    return this.receiptItems.controls.filter(
      (i) => i.get("chargedToUserId")?.value?.toString() === userId
    );
  }
}
