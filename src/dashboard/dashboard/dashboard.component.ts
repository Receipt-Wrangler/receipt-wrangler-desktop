import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { GroupState } from '@receipt-wrangler/receipt-wrangler-core';
import { Observable } from 'rxjs';
import { DEFAULT_HOST_CLASS } from 'src/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: DEFAULT_HOST_CLASS,
})
export class DashboardComponent {
  @Select(GroupState.selectedGroupId)
  public selectedGroupId!: Observable<string>;
}
