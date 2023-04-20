import { SelectionChange } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { DEFAULT_DIALOG_CONFIG } from 'constants';
import { Subject, take, tap } from 'rxjs';
import { BulkResolve, ReceiptsService } from 'src/api/receipts.service';
import { GroupRole } from 'src/enums/group-role.enum';
import { Receipt } from 'src/models/receipt';
import { SnackbarService } from 'src/services/snackbar.service';
import { ConfirmationDialogComponent } from 'src/shared-ui/confirmation-dialog/confirmation-dialog.component';
import { GroupState } from 'src/store/group.state';
import {
  SetPage,
  SetPageSize,
  SetReceiptFilterData,
} from 'src/store/receipt-table.actions';
import { ReceiptTableState } from 'src/store/receipt-table.state';
import { TableColumn } from 'src/table/table-column.interface';
import { TableComponent } from 'src/table/table/table.component';
import { GroupUtil } from 'src/utils/group.utils';
import { BulkResolveDialogComponent } from '../bulk-resolve-dialog/bulk-resolve-dialog.component';

@Component({
  selector: 'app-receipts-table',
  templateUrl: './receipts-table.component.html',
  styleUrls: ['./receipts-table.component.scss'],
})
export class ReceiptsTableComponent implements OnInit, AfterViewInit {
  constructor(
    private receiptsService: ReceiptsService,
    private snackbarService: SnackbarService,
    private store: Store,
    private groupUtil: GroupUtil,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  @ViewChild('dateCell') dateCell!: TemplateRef<any>;

  @ViewChild('nameCell') nameCell!: TemplateRef<any>;

  @ViewChild('paidByCell') paidByCell!: TemplateRef<any>;

  @ViewChild('amountCell') amountCell!: TemplateRef<any>;

  @ViewChild('categoryCell') categoryCell!: TemplateRef<any>;

  @ViewChild('tagCell') tagCell!: TemplateRef<any>;

  @ViewChild('isResolvedCell') isResolvedCell!: TemplateRef<any>;

  @ViewChild('resolvedDateCell') resolvedDateCell!: TemplateRef<any>;

  @ViewChild('actionsCell') actionsCell!: TemplateRef<any>;

  @ViewChild(TableComponent) table!: TableComponent;

  public groupId: number = 0;

  public groupRole = GroupRole;

  public dataSource: MatTableDataSource<Receipt> =
    new MatTableDataSource<Receipt>([]);

  public displayedColumns: string[] = [];

  public columns: TableColumn[] = [];

  public receipts: Receipt[] = [];

  public totalCount: number = 0;

  public checkboxChange: Subject<SelectionChange<any>> = new Subject();

  public ngOnInit(): void {
    // TODO: Set up shit to use state
    this.groupId = Number.parseInt(
      this.store.selectSnapshot(GroupState.selectedGroupId)
    );

    this.receiptsService
      .getPagedReceiptsForGroups(this.groupId.toString())
      .pipe(
        take(1),
        tap((pagedData) => {
          this.receipts = pagedData.data;
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
    this.columns = [
      {
        columnHeader: 'Date',
        matColumnDef: 'date',
        defaultSortDirection: 'desc',
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
        columnHeader: 'Is Resolved',
        matColumnDef: 'isResolved',
        template: this.isResolvedCell,
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
    ];
    this.displayedColumns = [
      'select',
      'date',
      'name',
      'paidBy',
      'amount',
      'categories',
      'tags',
      'isResolved',
      'resolvedDate',
    ];
  }

  private setActionsColumnDisplay(): void {
    const hasAccess = this.groupUtil.hasGroupAccess(
      this.groupId,
      GroupRole.EDITOR
    );
    if (hasAccess) {
      this.displayedColumns.push('actions');
    }
  }

  public sort(sortState: Sort): void {
    const page = this.store.selectSnapshot(ReceiptTableState.page);
    const pageSize = this.store.selectSnapshot(ReceiptTableState.pageSize);

    this.store.dispatch(
      new SetReceiptFilterData({
        page: page,
        pageSize: pageSize,
        orderBy: sortState.active,
        sortDirection: sortState.direction,
      })
    );

    this.receiptsService
      .getPagedReceiptsForGroups(this.groupId.toString())
      .pipe(
        take(1),
        tap((pagedData) => {
          this.receipts = pagedData.data;
          this.dataSource.data = pagedData.data;
          this.totalCount = pagedData.totalCount;
        })
      )
      .subscribe();
  }

  public toggleIsResolved(row: Receipt, index: number): void {
    this.receiptsService
      .toggleIsResolved(row.id.toString())
      .pipe(
        tap((receipt) => {
          let newReceipts = Array.from(this.dataSource.data);
          newReceipts[index].isResolved = receipt.isResolved;
          newReceipts[index].resolvedDate = receipt.resolvedDate;
          this.dataSource.data = newReceipts;
        })
      )
      .subscribe();
  }

  public deleteReceipt(row: Receipt): void {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent);

    dialogRef.componentInstance.headerText = 'Delete Receipt';
    dialogRef.componentInstance.dialogContent = `Are you sure you would like to delete the receipt ${row.name}? This actoin is irreversible.`;

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        tap((r) => {
          if (r) {
            this.receiptsService
              .deleteReceipt(row.id.toString())
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
    this.receiptsService
      .duplicateReceipt(id)
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

    this.receiptsService
      .getPagedReceiptsForGroups(this.groupId.toString())
      .pipe(
        take(1),
        tap((pagedData) => {
          this.receipts = pagedData.data;
          this.dataSource.data = pagedData.data;
          this.totalCount = pagedData.totalCount;
        })
      )
      .subscribe();
  }

  public showResolveDialog(): void {
    const ref = this.matDialog.open(
      BulkResolveDialogComponent,
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
                }
              | undefined
          ) => {
            if (this.table.selection.hasValue()) {
              const receiptIds = (
                this.table.selection.selected as Receipt[]
              ).map((r) => r.id);

              const bulkResolve: BulkResolve = {
                comment: commentForm?.comment ?? '',
                receiptIds: receiptIds,
              };
              this.receiptsService
                .bulkResolveReceipts(bulkResolve)
                .pipe(
                  take(1),
                  tap((receipts) => {
                    let newReceipts = Array.from(this.receipts);
                    receipts.forEach((r) => {
                      const receiptInTable = newReceipts.find(
                        (nr) => r.id === nr.id
                      );
                      if (receiptInTable) {
                        receiptInTable.isResolved = true;
                        receiptInTable.resolvedDate = r.resolvedDate;
                      }
                    });
                    this.receipts = newReceipts;
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
