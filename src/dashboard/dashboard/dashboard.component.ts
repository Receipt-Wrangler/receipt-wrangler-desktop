import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ReceiptsService } from 'src/api/receipts.service';
import { DEFAULT_HOST_CLASS } from 'src/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: DEFAULT_HOST_CLASS,
})
export class DashboardComponent {
  constructor(private receiptsService: ReceiptsService, private store: Store) {}
}
