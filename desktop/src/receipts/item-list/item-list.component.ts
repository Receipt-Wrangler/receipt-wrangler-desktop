import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { map, Observable, of, startWith, take, tap } from 'rxjs';
import { Receipt } from 'src/models';
import { Item } from 'src/models/item';
import { User } from 'src/models/user';
import { UserState } from 'src/store/user.state';
import { buildItemForm } from '../utils/form.utils';

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
    private formBuilder: FormBuilder
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
              buildItemForm(item, this.originalReceipt?.id?.toString())
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
      const formArray = this.form.get('receiptItems') as FormArray;
      formArray.push(this.newItemFormGroup);
      this.exitAddMode();
      this.setUserItemMap();
    }
  }

  public removeItem(itemData: ItemData): void {
    const formArray = this.form.get('receiptItems') as FormArray;
    formArray.removeAt(itemData.arrayIndex);
    this.setUserItemMap();
  }
}
