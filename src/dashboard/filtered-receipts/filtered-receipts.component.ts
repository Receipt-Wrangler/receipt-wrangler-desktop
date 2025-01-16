import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation, } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { take, tap } from "rxjs";
import { ReceiptFilterService } from "src/services/receipt-filter.service";
import { Receipt, ReceiptPagedRequestCommand, Widget } from "../../open-api";
import { GroupRolePipe } from "../../pipes/group-role.pipe";
import { DashboardListComponent } from "../dashboard-list/dashboard-list.component";

@UntilDestroy()
@Component({
  selector: "/app-filtered-receipts",
  templateUrl: "./filtered-receipts.component.html",
  styleUrls: ["./filtered-receipts.component.scss"],
  providers: [GroupRolePipe],
  encapsulation: ViewEncapsulation.None,
})
export class FilteredReceiptsComponent implements OnInit, AfterViewInit {
  @ViewChild(DashboardListComponent)
  public dashboardListComponent!: DashboardListComponent;

  @Input() public widget!: Widget;

  @Input() public groupId?: number;

  public page: number = 1;

  public pageSize: number = 25;

  public receipts: Receipt[] = [];

  public buildItemRouterLink = (receipt: Receipt): string => {
    return "/receipts/" + receipt.id + "/view";
  };

  constructor(
    private cdr: ChangeDetectorRef,
    private receiptFilterService: ReceiptFilterService,
  ) {}

  public ngOnInit(): void {
    this.getData();
  }

  public ngAfterViewInit(): void {
    this.listenForRenderedRange();
  }

  private listenForRenderedRange(): void {
    this.dashboardListComponent.cdkVirtualScrollViewport.renderedRangeStream
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
    if (!this.groupId) {
      return;
    }

    const groupId = this.groupId;
    const command: ReceiptPagedRequestCommand = {
      page: this.page,
      pageSize: this.pageSize,
      filter: this.widget.configuration,
      orderBy: "date",
      sortDirection: "desc",
    };
    this.receiptFilterService
      .getPagedReceiptsForGroups(
        groupId?.toString() ?? "",
        undefined,
        undefined,
        undefined,
        undefined,
        command
      )
      .pipe(
        take(1),
        tap((pagedData) => {
          this.receipts = [...this.receipts, ...pagedData.data as any as Receipt[]];
          this.cdr.detectChanges();
        })
      )
      .subscribe();
  }
}
