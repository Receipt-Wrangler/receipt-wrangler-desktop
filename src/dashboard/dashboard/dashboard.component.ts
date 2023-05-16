import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ReceiptsService } from 'src/api/receipts.service';
import { GroupState } from 'src/store/group.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private receiptsService: ReceiptsService, private store: Store) {}

  public ngOnInit(): void {
    this.getReceipts();
  }

  private getReceipts(): void {
    const currentGroupId = this.store.selectSnapshot(
      GroupState.selectedGroupId
    );
    this.receiptsService.getReceiptsForGroupIds([currentGroupId]).subscribe();
  }
}
