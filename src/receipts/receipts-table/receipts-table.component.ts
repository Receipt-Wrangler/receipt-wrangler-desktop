import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { ReceiptsService } from 'src/api/receipts.service';
import { GroupRole } from 'src/enums/group-role.enum';
import { Receipt } from 'src/models/receipt';
import { SnackbarService } from 'src/services/snackbar.service';
import { GroupState } from 'src/store/group.state';
import { TableColumn } from 'src/table/table-column.interface';
import { GroupUtil } from 'src/utils/group.utils';

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
    private groupUtil: GroupUtil
  ) {}

  @ViewChild('dateCell') dateCell!: TemplateRef<any>;

  @ViewChild('nameCell') nameCell!: TemplateRef<any>;

  @ViewChild('paidByCell') paidByCell!: TemplateRef<any>;

  @ViewChild('amountCell') amountCell!: TemplateRef<any>;

  @ViewChild('categoryCell') categoryCell!: TemplateRef<any>;

  @ViewChild('tagCell') tagCell!: TemplateRef<any>;

  @ViewChild('isResolvedCell') isResolvedCell!: TemplateRef<any>;

  @ViewChild('actionsCell') actionsCell!: TemplateRef<any>;

  public receipts: Receipt[] = [];

  public groupId: number = 0;

  public groupRole = GroupRole;

  public dataSource: MatTableDataSource<Receipt> =
    new MatTableDataSource<Receipt>([]);

  public displayedColumns: string[] = [];

  public columns: TableColumn[] = [];

  public ngOnInit(): void {
    this.groupId = Number.parseInt(
      this.store.selectSnapshot(GroupState.selectedGroupId)
    );
    this.receiptsService
      .getReceiptsForGroup(this.groupId.toString())
      .pipe(
        tap((receipts) => {
          this.receipts = receipts;
          this.dataSource = new MatTableDataSource<Receipt>(receipts);
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
      },
      {
        columnHeader: 'Name',
        matColumnDef: 'name',
        template: this.nameCell,
      },
      {
        columnHeader: 'Paid By',
        matColumnDef: 'paidBy',
        template: this.paidByCell,
      },
      {
        columnHeader: 'Amount',
        matColumnDef: 'amount',
        template: this.amountCell,
      },
      {
        columnHeader: 'Categories',
        matColumnDef: 'categories',
        template: this.categoryCell,
      },
      {
        columnHeader: 'Tags',
        matColumnDef: 'tags',
        template: this.tagCell,
      },
      {
        columnHeader: 'Is Resolved',
        matColumnDef: 'isResolved',
        template: this.isResolvedCell,
      },
      {
        columnHeader: 'Actions',
        matColumnDef: 'actions',
        template: this.actionsCell,
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

  public toggleIsResolved(row: Receipt, index: number): void {
    this.receiptsService
      .toggleIsResolved(row.id.toString())
      .pipe(
        tap(() => {
          const newReceipts = Array.from(this.receipts);
          newReceipts.splice(index, 1, {
            ...row,
            isResolved: !row.isResolved,
          });
          this.receipts = newReceipts;
        })
      )
      .subscribe();
  }

  public deleteReceipt(row: Receipt): void {
    this.receiptsService
      .deleteReceipt(row.id.toString())
      .pipe(
        tap(() => {
          this.receipts = this.receipts.filter((r) => r.id !== row.id);
          this.snackbarService.success('Receipt successfully deleted');
        })
      )
      .subscribe();
  }
}
