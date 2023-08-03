import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import {
  GroupState,
  UserService,
} from '@receipt-wrangler/receipt-wrangler-core';
import { Observable, switchMap, tap } from 'rxjs';
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
