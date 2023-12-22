import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  GroupState,
  Receipt,
  ReceiptPagedRequestCommand,
  Widget,
} from '@receipt-wrangler/receipt-wrangler-core';
import { take, tap } from 'rxjs';
import { ReceiptFilterService } from 'src/services/receipt-filter.service';

@Component({
  selector: 'app-filtered-receipts',
  templateUrl: './filtered-receipts.component.html',
  styleUrls: ['./filtered-receipts.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FilteredReceiptsComponent {
  @Input() public widget!: Widget;

  public page: number = 1;

  public pageSize: number = 25;

  public receipts: Receipt[] = [];

  constructor(
    private receiptFilterService: ReceiptFilterService,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    const groupId = this.store.selectSnapshot(GroupState.selectedGroupId);
    const command: ReceiptPagedRequestCommand = {
      page: this.page,
      pageSize: this.pageSize,
      filter: this.widget.configuration,
      orderBy: 'date',
      sortDirection: 'desc',
    };
    this.receiptFilterService
      .getPagedReceiptsForGroups(
        groupId,
        undefined,
        undefined,
        undefined,
        undefined,
        command
      )
      .pipe(
        take(1),
        tap((receipts) => {
          this.receipts = receipts.data;
        })
      )
      .subscribe();
  }
}
