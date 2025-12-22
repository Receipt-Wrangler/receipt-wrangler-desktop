import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Store } from "@ngxs/store";
import { ChartConfiguration } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { take, tap } from "rxjs";
import { GroupState } from "../../store/index";
import { Category, Group, Receipt, ReceiptPagedRequestCommand, Widget } from "../../open-api/index";
import { ReceiptFilterService } from "../../services/receipt-filter.service";

interface CategoryData {
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

  constructor(
    private receiptFilterService: ReceiptFilterService,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.loadData();
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
          const receipts = pagedData.data as unknown as Receipt[];
          this.aggregateByCategory(receipts);
          this.isLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe();
  }

  private aggregateByCategory(receipts: Receipt[]): void {
    const categoryMap = new Map<string, CategoryData>();

    receipts.forEach(receipt => {
      const amount = parseFloat(receipt.amount) || 0;

      if (receipt.categories && receipt.categories.length > 0) {
        receipt.categories.forEach((category: Category) => {
          const categoryName = category.name || "Unknown";
          const existing = categoryMap.get(categoryName);
          if (existing) {
            existing.amount += amount / receipt.categories.length;
          } else {
            categoryMap.set(categoryName, {
              name: categoryName,
              amount: amount / receipt.categories.length
            });
          }
        });
      } else {
        const uncategorized = categoryMap.get("Uncategorized");
        if (uncategorized) {
          uncategorized.amount += amount;
        } else {
          categoryMap.set("Uncategorized", {
            name: "Uncategorized",
            amount: amount
          });
        }
      }
    });

    const sortedCategories = Array.from(categoryMap.values())
      .sort((a, b) => b.amount - a.amount);

    this.hasData = sortedCategories.length > 0;

    this.pieChartData = {
      labels: sortedCategories.map(c => c.name),
      datasets: [{
        data: sortedCategories.map(c => parseFloat(c.amount.toFixed(2))),
        backgroundColor: this.chartColors.slice(0, sortedCategories.length)
      }]
    };

    if (this.chart) {
      this.chart.update();
    }
  }
}
