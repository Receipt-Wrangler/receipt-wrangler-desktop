import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of, startWith, tap } from 'rxjs';
import { Receipt } from 'src/models';
import { Item } from 'src/models/item';

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
  @Input() public form!: FormGroup;

  @Input() public originalReceipt?: Receipt;

  public userItemMap: Map<string, ItemData[]> = new Map<string, ItemData[]>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.originalReceipt = this.activatedRoute.snapshot.data['receipt'];
    this.initForm();
    this.initUserItemMap();
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

  private initUserItemMap(): void {
    const receiptItems = this.form.get('receiptItems');
    if (receiptItems) {
      receiptItems.valueChanges
        .pipe(
          startWith(receiptItems.value),
          tap(() => {
            const items = this.form.get('receiptItems')?.value as Item[];
            const map = new Map<string, ItemData[]>();

            if (items?.length > 0) {
              items.forEach((item, index) => {
                const chargedToUserId = item.chargedToUserId.toString();
                const itemData: ItemData = {
                  item: item,
                  arrayIndex: index,
                };
                console.warn(itemData);

                if (map.has(chargedToUserId)) {
                  const newItems = Array.from(
                    map.get(chargedToUserId) as ItemData[]
                  );
                  newItems.push(itemData);
                } else {
                  map.set(chargedToUserId, [itemData]);
                }
              });
            }
            this.userItemMap = map;
          })
        )
        .subscribe();
    }
    console.warn(this.userItemMap);
  }

  private buildItemForm(item: Item): FormGroup {
    return this.formBuilder.group({
      name: item.name ?? '',
      chargedToUserId: item.chargedToUserId ?? '',
      receiptId: item.receiptId ?? '',
      amount: item.amount ?? 1,
      isTaxed: item.isTaxed ?? false,
    });
  }
}
