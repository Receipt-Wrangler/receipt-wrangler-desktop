import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { ReceiptsService } from 'src/api/receipts.service';
import { GroupRole } from 'src/enums/group-role.enum';
import { Receipt } from 'src/models/receipt';
import { SnackbarService } from 'src/services/snackbar.service';
import { GroupState } from 'src/store/group.state';
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

  public receipts: Receipt[] = [];

  public groupId: number = 0;

  public groupRole = GroupRole;

  public displayedColumns = [
    'date',
    'name',
    'paidBy',
    'amount',
    'categories',
    'tags',
    'isResolved',
  ];

  public ngOnInit(): void {
    this.groupId = Number.parseInt(
      this.store.selectSnapshot(GroupState.selectedGroupId)
    );
    this.setActionsColumnDisplay();
    this.receiptsService
      .getReceiptsForGroup(this.groupId.toString())
      .pipe(tap((receipts) => (this.receipts = receipts)))
      .subscribe();
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
