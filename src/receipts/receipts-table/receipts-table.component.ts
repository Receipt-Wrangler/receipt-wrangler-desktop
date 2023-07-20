import { map, Observable, Subject, take, tap } from "rxjs";
import { ReceiptFilterService } from "src/services/receipt-filter.service";
import { SnackbarService } from "src/services/snackbar.service";
import {
  ConfirmationDialogComponent
} from "src/shared-ui/confirmation-dialog/confirmation-dialog.component";
import { GroupState } from "src/store/group.state";
import {
  ResetReceiptFilter, SetPage, SetPageSize, SetReceiptFilterData
} from "src/store/receipt-table.actions";
import { ReceiptTableState } from "src/store/receipt-table.state";
import { TableColumn } from "src/table/table-column.interface";
import { TableComponent } from "src/table/table/table.component";
import { GroupUtil } from "src/utils/group.utils";

import { SelectionChange } from "@angular/cdk/collections";
import {
  AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import {
  BulkStatusUpdateCommand, Category, GroupMember, Receipt, ReceiptService, Tag
} from "@noah231515/receipt-wrangler-core";

import { ALL_GROUP, DEFAULT_DIALOG_CONFIG, DEFAULT_HOST_CLASS } from "../../constants";
import {
  BulkStatusUpdateComponent
} from "../bulk-resolve-dialog/bulk-status-update-dialog.component";
import { ReceiptFilterComponent } from "../receipt-filter/receipt-filter.component";

@Component({
  selector: 'app-receipts-table',
  templateUrl: './receipts-table.component.html',
  styleUrls: ['./receipts-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: DEFAULT_HOST_CLASS,
})
export class ReceiptsTableComponent implements OnInit, AfterViewInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private groupUtil: GroupUtil,
    private matDialog: MatDialog,
    private receiptFilterService: ReceiptFilterService,
    private receiptService: ReceiptService,
    private router: Router,
    private snackbarService: SnackbarService,
    private store: Store
  ) {}

  @ViewChild('dateCell') dateCell!: TemplateRef<any>;

  @ViewChild('nameCell') nameCell!: TemplateRef<any>;

  @ViewChild('paidByCell') paidByCell!: TemplateRef<any>;

  @ViewChild('amountCell') amountCell!: TemplateRef<any>;

  @ViewChild('categoryCell') categoryCell!: TemplateRef<any>;

  @ViewChild('tagCell') tagCell!: TemplateRef<any>;

  @ViewChild('statusCell') statusCell!: TemplateRef<any>;

  @ViewChild('resolvedDateCell') resolvedDateCell!: TemplateRef<any>;

  @ViewChild('actionsCell') actionsCell!: TemplateRef<any>;

  @ViewChild(TableComponent) table!: TableComponent;

  @Select(ReceiptTableState.page) public page!: Observable<number>;

  @Select(ReceiptTableState.pageSize) public pageSize!: Observable<number>;

  public numFiltersApplied!: Observable<number | undefined>;

  public categories: Category[] = [];

  public tags: Tag[] = [];

  public groupId: string = '0';

  public groupRole = GroupMember.GroupRoleEnum;

  public dataSource: MatTableDataSource<Receipt> =
    new MatTableDataSource<Receipt>([]);

  public displayedColumns: string[] = [];

  public columns: TableColumn[] = [];

  public totalCount: number = 0;

  public checkboxChange: Subject<SelectionChange<any>> = new Subject();

  public firstSort: boolean = true;

  public showFilterCard: boolean = false;

  public ngOnInit(): void {
    this.numFiltersApplied = this.store
      .select(ReceiptTableState.numFiltersApplied)
      .pipe(
        map((num) => {
          if (num > 0) {
            return num;
          } else {
            return undefined;
          }
        })
      );
    const data = this.activatedRoute.snapshot.data;

    this.categories = data['categories'];

    this.tags = data['tags'];

    this.groupId = this.store
      .selectSnapshot(GroupState.selectedGroupId)
      ?.toString();

    this.receiptFilterService
      .getPagedReceiptsForGroups(this.groupId)
      .pipe(
        take(1),
        tap((pagedData) => {
          this.dataSource = new MatTableDataSource<Receipt>(pagedData.data);
          this.totalCount = pagedData.totalCount;
          this.setColumns();
          this.setActionsColumnDisplay();
        })
      )
      .subscribe();
  }

  public ngAfterViewInit(): void {
    this.checkboxChange = this.table?.selection?.changed;
  }

  private setColumns(): void {
    const columns = [
      {
        columnHeader: 'Receipt Date',
        matColumnDef: 'date',
        template: this.dateCell,
        sortable: true,
      },
      {
        columnHeader: 'Name',
        matColumnDef: 'name',
        template: this.nameCell,
        sortable: true,
      },
      {
        columnHeader: 'Paid By',
        matColumnDef: 'paidBy',
        template: this.paidByCell,
        sortable: true,
      },
      {
        columnHeader: 'Amount',
        matColumnDef: 'amount',
        template: this.amountCell,
        sortable: true,
      },
      {
        columnHeader: 'Categories',
        matColumnDef: 'categories',
        template: this.categoryCell,
        sortable: false,
      },
      {
        columnHeader: 'Tags',
        matColumnDef: 'tags',
        template: this.tagCell,
        sortable: false,
      },
      {
        columnHeader: 'Status',
        matColumnDef: 'status',
        template: this.statusCell,
        sortable: true,
      },
      {
        columnHeader: 'Resolved Date',
        matColumnDef: 'resolvedDate',
        template: this.resolvedDateCell,
        sortable: true,
      },
      {
        columnHeader: 'Actions',
        matColumnDef: 'actions',
        template: this.actionsCell,
        sortable: false,
      },
    ] as TableColumn[];
    this.displayedColumns = [
      'select',
      'date',
      'name',
      'paidBy',
      'amount',
      'categories',
      'tags',
      'status',
      'resolvedDate',
    ];
    const filter = this.store.selectSnapshot(ReceiptTableState.filterData);
    const orderByIndex = columns.findIndex(
      (c) => c.matColumnDef === filter.orderBy
    );

    if (orderByIndex >= 0) {
      columns[orderByIndex].defaultSortDirection = filter.sortDirection;
    } else {
      columns[0].defaultSortDirection = 'desc';
    }

    this.columns = columns;
  }

  private setActionsColumnDisplay(): void {
    if (this.groupId === ALL_GROUP) {
    } else {
      const groupIdNumber = Number.parseInt(this.groupId);
      const hasAccess = this.groupUtil.hasGroupAccess(
        groupIdNumber,
        GroupMember.GroupRoleEnum.EDITOR
      );
      if (hasAccess) {
        this.displayedColumns.push('actions');
      }
    }
  }

  public sort(sortState: Sort): void {
    if (!this.firstSort) {
      const filterData = this.store.selectSnapshot(
        ReceiptTableState.filterData
      );

      this.store.dispatch(
        new SetReceiptFilterData({
          page: filterData.page,
          pageSize: filterData.pageSize,
          orderBy: sortState.active,
          sortDirection: sortState.direction,
          filter: filterData.filter,
        })
      );

      this.receiptFilterService
        .getPagedReceiptsForGroups(this.groupId.toString())
        .pipe(
          take(1),
          tap((pagedData) => {
            this.dataSource.data = pagedData.data;
            this.totalCount = pagedData.totalCount;
          })
        )
        .subscribe();
    }
    this.firstSort = false;
  }

  public filterButtonClicked(): void {
    const dialogRef = this.matDialog.open(ReceiptFilterComponent, {
      minWidth: '50%',
      maxWidth: '100%',
      data: {
        categories: this.categories,
        tags: this.tags,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        tap((applyFilter) => {
          if (applyFilter) {
            this.getFilteredReceipts();
          }
        })
      )
      .subscribe();
  }

  public resetFilterButtonClicked(): void {
    this.store.dispatch(new ResetReceiptFilter());
    this.getFilteredReceipts();
  }

  private getFilteredReceipts(): void {
    this.receiptFilterService
      .getPagedReceiptsForGroups(this.groupId.toString())
      .pipe(
        take(1),
        tap((pagedData) => {
          this.dataSource.data = pagedData.data;
          this.totalCount = pagedData.totalCount;
        })
      )
      .subscribe();
  }

  public deleteReceipt(row: Receipt): void {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent);

    dialogRef.componentInstance.headerText = 'Delete Receipt';
    dialogRef.componentInstance.dialogContent = `Are you sure you would like to delete the receipt ${row.name}? This action is irreversible.`;

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        tap((r) => {
          if (r) {
            this.receiptService
              .deleteReceiptById(row.id as number)
              .pipe(
                take(1),
                tap(() => {
                  this.dataSource.data = this.dataSource.data.filter(
                    (r) => r.id !== row.id
                  );
                  this.snackbarService.success('Receipt successfully deleted');
                })
              )
              .subscribe();
          }
        })
      )
      .subscribe();
  }

  public duplicateReceipt(id: string): void {
    this.receiptService
      .duplicateReceipt(Number.parseInt(id))
      .pipe(
        tap((r: Receipt) => {
          this.snackbarService.success('Receipt successfully duplicated');
          this.router.navigateByUrl(`/receipts/${r.id}/view`);
        })
      )
      .subscribe();
  }

  public updatePageData(pageEvent: PageEvent): void {
    const newPage = pageEvent.pageIndex + 1;
    this.store.dispatch(new SetPage(newPage));
    this.store.dispatch(new SetPageSize(pageEvent.pageSize));

    this.receiptFilterService
      .getPagedReceiptsForGroups(this.groupId.toString())
      .pipe(
        take(1),
        tap((pagedData) => {
          this.dataSource.data = pagedData.data;
          this.totalCount = pagedData.totalCount;
        })
      )
      .subscribe();
  }

  public showStatusUpdateDialog(): void {
    const ref = this.matDialog.open(
      BulkStatusUpdateComponent,
      DEFAULT_DIALOG_CONFIG
    );

    ref
      .afterClosed()
      .pipe(
        take(1),
        tap(
          (
            commentForm:
              | {
                  comment: string;
                  status: Receipt.StatusEnum;
                }
              | undefined
          ) => {
            if (this.table.selection.hasValue() && commentForm) {
              const receiptIds = (
                this.table.selection.selected as Receipt[]
              ).map((r) => r.id as number);

              const bulkResolve: BulkStatusUpdateCommand = {
                comment: commentForm?.comment ?? '',
                status: commentForm?.status,
                receiptIds: receiptIds,
              };
              this.receiptService
                .bulkReceiptStatusUpdate(bulkResolve)
                .pipe(
                  take(1),
                  tap((receipts) => {
                    let newReceipts = Array.from(this.dataSource.data);
                    receipts.forEach((r) => {
                      const receiptInTable = newReceipts.find(
                        (nr) => r.id === nr.id
                      );
                      if (receiptInTable) {
                        receiptInTable.status = r.status;
                        receiptInTable.resolvedDate = r.resolvedDate;
                      }
                    });
                    this.dataSource.data = newReceipts;
                  })
                )
                .subscribe();
            }
          }
        )
      )
      .subscribe();
  }
}
