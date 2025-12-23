import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Store } from "@ngxs/store";
import { ChartConfiguration } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { take, tap } from "rxjs";
import { GroupState } from "../../store/index";
import { Category, Group, Receipt, ReceiptPagedRequestCommand, Tag, Widget } from "../../open-api/index";
import { ReceiptFilterService } from "../../services/receipt-filter.service";

export type PieChartAggregationType = "category" | "tag";

export interface AggregationOption {
  value: PieChartAggregationType;
  displayValue: string;
}

interface AggregatedData {
  name: string;
  amount: number;
}

@UntilDestroy()
@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.scss"],
  standalone: false
})
export class PieChartComponent implements OnInit {
  @Input() public widget!: Widget;
  @Input() public groupId?: number;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public isLoading = true;
  public hasData = false;

  public aggregationOptions: AggregationOption[] = [
    { value: "category", displayValue: "Categories" },
    { value: "tag", displayValue: "Tags" }
  ];

  public aggregationTypeControl = new FormControl<PieChartAggregationType>("category");

  public pieChartData: ChartConfiguration<"pie">["data"] = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  };

  public pieChartOptions: ChartConfiguration<"pie">["options"] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          padding: 15
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed;
            return ` $${value.toFixed(2)}`;
          }
        }
      }
    }
  };

  private readonly chartColors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
    "#FF9F40", "#7C4DFF", "#00BCD4", "#8BC34A", "#F44336",
    "#E91E63", "#673AB7", "#3F51B5", "#009688", "#CDDC39"
  ];

  private receipts: Receipt[] = [];

  constructor(
    private receiptFilterService: ReceiptFilterService,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.initializeAggregationType();
    this.listenForAggregationTypeChanges();
    this.loadData();
  }

  private initializeAggregationType(): void {
    const savedType = this.widget.configuration?.["aggregationType"] as PieChartAggregationType;
    if (savedType && (savedType === "category" || savedType === "tag")) {
      this.aggregationTypeControl.setValue(savedType, { emitEvent: false });
    }
  }

  private listenForAggregationTypeChanges(): void {
    this.aggregationTypeControl.valueChanges
      .pipe(
        untilDestroyed(this),
        tap(() => {
          if (this.receipts.length > 0) {
            this.aggregateData(this.receipts);
            this.cdr.detectChanges();
          }
        })
      )
      .subscribe();
  }

  private loadData(): void {
    if (!this.groupId) {
      this.isLoading = false;
      return;
    }

    const group = this.store.selectSnapshot(GroupState.getGroupById(this.groupId.toString()));
    const groupIds = this.getGroupIds(group);

    this.fetchAllReceipts(groupIds);
  }

  private getGroupIds(group: Group | undefined): number[] {
    if (group?.isAllGroup) {
      return this.store.selectSnapshot(GroupState.groupsWithoutAll).map(g => g.id);
    }
    return [this.groupId ?? 0];
  }

  private fetchAllReceipts(groupIds: number[]): void {
    const command: ReceiptPagedRequestCommand = {
      page: 1,
      pageSize: 1000,
      orderBy: "date",
      sortDirection: "desc"
    };

    const groupIdStr = groupIds.join(",");

    this.receiptFilterService
      .getPagedReceiptsForGroups(groupIdStr, 1, 1000, "date", "desc", command)
      .pipe(
        take(1),
        untilDestroyed(this),
        tap((pagedData) => {
          this.receipts = pagedData.data as unknown as Receipt[];
          this.aggregateData(this.receipts);
          this.isLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe();
  }

  private aggregateData(receipts: Receipt[]): void {
    const aggregationType = this.aggregationTypeControl.value;

    if (aggregationType === "tag") {
      this.aggregateByTag(receipts);
    } else {
      this.aggregateByCategory(receipts);
    }
  }

  private aggregateByCategory(receipts: Receipt[]): void {
    const dataMap = new Map<string, AggregatedData>();

    receipts.forEach(receipt => {
      const amount = parseFloat(receipt.amount) || 0;

      if (receipt.categories && receipt.categories.length > 0) {
        receipt.categories.forEach((category: Category) => {
          const name = category.name || "Unknown";
          const existing = dataMap.get(name);
          if (existing) {
            existing.amount += amount / receipt.categories.length;
          } else {
            dataMap.set(name, {
              name: name,
              amount: amount / receipt.categories.length
            });
          }
        });
      } else {
        const uncategorized = dataMap.get("Uncategorized");
        if (uncategorized) {
          uncategorized.amount += amount;
        } else {
          dataMap.set("Uncategorized", {
            name: "Uncategorized",
            amount: amount
          });
        }
      }
    });

    this.updateChartData(dataMap);
  }

  private aggregateByTag(receipts: Receipt[]): void {
    const dataMap = new Map<string, AggregatedData>();

    receipts.forEach(receipt => {
      const amount = parseFloat(receipt.amount) || 0;

      if (receipt.tags && receipt.tags.length > 0) {
        receipt.tags.forEach((tag: Tag) => {
          const name = tag.name || "Unknown";
          const existing = dataMap.get(name);
          if (existing) {
            existing.amount += amount / receipt.tags.length;
          } else {
            dataMap.set(name, {
              name: name,
              amount: amount / receipt.tags.length
            });
          }
        });
      } else {
        const untagged = dataMap.get("Untagged");
        if (untagged) {
          untagged.amount += amount;
        } else {
          dataMap.set("Untagged", {
            name: "Untagged",
            amount: amount
          });
        }
      }
    });

    this.updateChartData(dataMap);
  }

  private updateChartData(dataMap: Map<string, AggregatedData>): void {
    const sortedData = Array.from(dataMap.values())
      .sort((a, b) => b.amount - a.amount);

    this.hasData = sortedData.length > 0;

    this.pieChartData = {
      labels: sortedData.map(d => d.name),
      datasets: [{
        data: sortedData.map(d => parseFloat(d.amount.toFixed(2))),
        backgroundColor: this.chartColors.slice(0, sortedData.length)
      }]
    };

    if (this.chart) {
      this.chart.update();
    }
  }
}
