import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation, } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Store } from "@ngxs/store";
import { take, tap } from "rxjs";
import { ReceiptFilterService } from "src/services/receipt-filter.service";
import { Receipt, ReceiptPagedRequestCommand, Widget } from "../../open-api";
import { ReceiptQueueService } from "../../services/receipt-queue.service";
import { GroupState } from "../../store";

@UntilDestroy()
@Component({
  selector: "app-filtered-receipts",
  templateUrl: "./filtered-receipts.component.html",
  styleUrls: ["./filtered-receipts.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FilteredReceiptsComponent implements OnInit, AfterViewInit {
  @ViewChild(CdkVirtualScrollViewport)
  public cdkVirtualScrollViewport!: CdkVirtualScrollViewport;

  @Input() public widget!: Widget;

  public page: number = 1;

  public pageSize: number = 25;

  public receipts: Receipt[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private receiptFilterService: ReceiptFilterService,
    private receiptQueueService: ReceiptQueueService,
    private store: Store,
  ) {}

  public ngOnInit(): void {
    this.getData();
  }

  public ngAfterViewInit(): void {
    this.listenForRenderedRange();
  }

  private listenForRenderedRange(): void {
    this.cdkVirtualScrollViewport.renderedRangeStream
      .pipe(
        untilDestroyed(this),
        tap((range) => {
          if (range.end === this.receipts.length) {
            this.page++;
            this.getData();
          }
        })
      )
      .subscribe();
  }

  private getData(): void {
    const groupId = this.store.selectSnapshot(GroupState.selectedGroupId);
    const command: ReceiptPagedRequestCommand = {
      page: this.page,
      pageSize: this.pageSize,
      filter: this.widget.configuration,
      orderBy: "date",
      sortDirection: "desc",
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
        tap((pagedData) => {
          this.receipts = [...this.receipts, ...pagedData.data as Receipt[]];
          this.cdr.detectChanges();
        })
      )
      .subscribe();
  }

  public queueEdit(): void {
    this.receiptQueueService.initQueueAndNavigate(
      this.receipts.map((receipt) => receipt.id.toString())
    );
  }
}
