import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { map, Observable, of, startWith, take, tap } from 'rxjs';
import { Receipt } from 'src/models';
import { Item } from 'src/models/item';
import { User } from 'src/models/user';
import { UserState } from 'src/store/user.state';

export interface ItemData {
  item: Item;
  arrayIndex: number;
}

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  @Select(UserState.users) public users!: Observable<User[]>;

  @Input() public form!: FormGroup;

  @Input() public originalReceipt?: Receipt;

  public newItemFormGroup: FormGroup = new FormGroup({});

  public userItemMap: Map<string, ItemData[]> = new Map<string, ItemData[]>();

  public isAdding: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.originalReceipt = this.activatedRoute.snapshot.data['receipt'];
    this.initForm();
    this.setUserItemMap();
  }

  private initForm(): void {
    this.form.addControl(
      'receiptItems',
      this.formBuilder.array(
        this.originalReceipt?.receiptItems
          ? this.originalReceipt.receiptItems.map((item) =>
              this.buildItemForm(item)
            )
          : []
      )
    );
  }

  public setUserItemMap(): void {
    const receiptItems = this.form.get('receiptItems');
    if (receiptItems) {
      const items = this.form.get('receiptItems')?.value as Item[];
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

  private buildItemForm(item?: Item): FormGroup {
    return this.formBuilder.group({
      name: [item?.name ?? '', Validators.required],
      chargedToUserId: [item?.chargedToUserId ?? '', Validators.required],
      receiptId: item?.receiptId ?? this.originalReceipt?.id,
      amount: [item?.amount ?? 1, Validators.required],
      isTaxed: item?.isTaxed ?? false,
    });
  }

  public initAddMode(): void {
    this.isAdding = true;
    this.newItemFormGroup = this.buildItemForm();
  }

  public exitAddMode(): void {
    this.isAdding = false;
    this.newItemFormGroup = new FormGroup({});
  }

  public submitNewItemFormGroup(): void {
    if (this.newItemFormGroup.valid) {
      const formArray = this.form.get('receiptItems') as FormArray;
      formArray.push(this.newItemFormGroup);
      this.exitAddMode();
      this.setUserItemMap();
    }
  }

  // TODO: move into shared component
  public paidByDisplayWith(id: number): string {
    const user = this.store.selectSnapshot(
      UserState.getUserById(id.toString())
    );

    if (user) {
      return user.displayName;
    }
    return '';
  }

  public removeItem(itemData: ItemData): void {
    const formArray = this.form.get('receiptItems') as FormArray;
    formArray.removeAt(itemData.arrayIndex);
    this.setUserItemMap();
  }
}
