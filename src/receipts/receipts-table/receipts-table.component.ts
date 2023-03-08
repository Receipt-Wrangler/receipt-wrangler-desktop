import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { take, tap } from 'rxjs';
import { ReceiptsService } from 'src/api/receipts.service';
import { GroupRole } from 'src/enums/group-role.enum';
import { Receipt } from 'src/models/receipt';
import { SnackbarService } from 'src/services/snackbar.service';
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
    private sortByDisplayName: SortByDisplayName
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
          const newReceipts = Array.from(this.dataSource.data);
          newReceipts.splice(index, 1, {
            ...row,
            isResolved: !row.isResolved,
          });
          this.dataSource.data = newReceipts;
        })
      )
      .subscribe();
  }

  public deleteReceipt(row: Receipt): void {
    this.receiptsService
      .deleteReceipt(row.id.toString())
      .pipe(
        tap(() => {
          this.dataSource.data = this.dataSource.data.filter(
            (r) => r.id !== row.id
          );
          this.snackbarService.success('Receipt successfully deleted');
        })
      )
      .subscribe();
  }
}
