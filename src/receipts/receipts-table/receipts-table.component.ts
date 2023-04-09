import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { take, tap } from 'rxjs';
import { ReceiptsService } from 'src/api/receipts.service';
import { GroupRole } from 'src/enums/group-role.enum';
import { Receipt } from 'src/models/receipt';
import { SnackbarService } from 'src/services/snackbar.service';
import { ConfirmationDialogComponent } from 'src/shared-ui/confirmation-dialog/confirmation-dialog.component';
import { GroupState } from 'src/store/group.state';
import { TableColumn } from 'src/table/table-column.interface';
import { TableComponent } from 'src/table/table/table.component';
import { GroupUtil } from 'src/utils/group.utils';
import { SortByDisplayName } from 'src/utils/sort-by-displayname';

@Component({
  selector: 'app-receipts-table',
  templateUrl: './receipts-table.component.html',
  styleUrls: ['./receipts-table.component.scss'],
})
export class ReceiptsTableComponent implements OnInit {
  constructor(
    private receiptsService: ReceiptsService,
    private snackbarService: SnackbarService,
    private store: Store,
    private groupUtil: GroupUtil,
    private sortByDisplayName: SortByDisplayName,
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

  @ViewChild('actionsCell') actionsCell!: TemplateRef<any>;

  @ViewChild(TableComponent) table!: TableComponent;

  public groupId: number = 0;

  public groupRole = GroupRole;

  public dataSource: MatTableDataSource<Receipt> =
    new MatTableDataSource<Receipt>([]);

  public displayedColumns: string[] = [];

  public columns: TableColumn[] = [];

  public receipts: Receipt[] = [];

  public ngOnInit(): void {
    this.groupId = Number.parseInt(
      this.store.selectSnapshot(GroupState.selectedGroupId)
    );
    this.receiptsService
      .getReceiptsForGroup(this.groupId.toString())
      .pipe(
        take(1),
        tap((receipts) => {
          this.receipts = receipts;
          this.dataSource = new MatTableDataSource<Receipt>(receipts);
          this.dataSource.paginator = this.table.paginator;
          this.dataSource.sort = this.table.sort;
          this.setColumns();
          this.setActionsColumnDisplay();
        })
      )
      .subscribe();
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
        columnHeader: 'Actions',
        matColumnDef: 'actions',
        template: this.actionsCell,
        sortable: false,
      },
    ];
    this.displayedColumns = [
      'date',
      'name',
      'paidBy',
      'amount',
      'categories',
      'tags',
      'isResolved',
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

  public sortPaidBy(sortState: Sort): void {
    if (sortState.active === 'paidBy') {
      if (sortState.direction === '') {
        this.dataSource.data = this.receipts;
      }

      const newData = this.sortByDisplayName.sort(
        this.dataSource.data,
        sortState,
        'paidByUserId'
      );

      this.dataSource.data = newData;
    }
  }

  public toggleIsResolved(row: Receipt, index: number): void {
    this.receiptsService
      .toggleIsResolved(row.id.toString())
      .pipe(
        tap(() => {
          let newReceipts = Array.from(this.dataSource.data);
          newReceipts[index].isResolved = !newReceipts[index].isResolved;
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
}
