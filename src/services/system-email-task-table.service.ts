import { Injectable } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { PagedRequestCommand, SortDirection } from "src/open-api";
import { SystemEmailTaskTableState } from "../store/system-email-task-table.state";
import { SetOrderBy, SetPage, SetPageSize, SetSortDirection } from "../store/system-email-task-table.state.actions";
import { BaseTableService } from "./base-table.service";

@Injectable()
export class SystemEmailTaskTableService extends BaseTableService {
  override page$: Observable<number>;
  override pageSize$: Observable<number>;

  constructor(private store: Store) {
    super();
    this.page$ = this.store.select(SystemEmailTaskTableState.page);
    this.pageSize$ = this.store.select(SystemEmailTaskTableState.pageSize);
  }


  public getPagedRequestCommand(): PagedRequestCommand {
    return this.store.selectSnapshot(SystemEmailTaskTableState.state);
  }

  override setPage(page: number): void {
    this.store.dispatch(new SetPage(page));
  }

  override setPageSize(pageSize: number): void {
    this.store.dispatch(new SetPageSize(pageSize));
  }

  override setOrderBy(orderBy: Sort): void {
    this.store.dispatch(new SetOrderBy(orderBy.active));
  }

  override setSortDirection(sortDirection: SortDirection): void {
    this.store.dispatch(new SetSortDirection(sortDirection));
  }
}
