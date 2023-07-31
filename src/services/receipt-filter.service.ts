import { Observable } from "rxjs";
import { ReceiptTableState } from "src/store/receipt-table.state";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SortDirection } from "@angular/material/sort";
import { Store } from "@ngxs/store";
import { PagedData, PagedRequestCommand } from "@noah231515/receipt-wrangler-core";

@Injectable({
  providedIn: 'root',
})
export class ReceiptFilterService {
  constructor(private store: Store, private httpClient: HttpClient) {}

  public getPagedReceiptsForGroups(
    groupId: string,
    page?: number,
    pageSize?: number,
    orderBy?: string,
    sortDirection?: SortDirection
  ): Observable<PagedData> {
    const filter = this.store.selectSnapshot(ReceiptTableState.filterData);
    let filterData: PagedRequestCommand = {
      page: page ?? filter.page,
      pageSize: pageSize ?? filter.pageSize,
      orderBy: orderBy ?? filter.orderBy,
      sortDirection: sortDirection ?? filter.sortDirection,
      filter: Object.assign(filter.filter, {}),
    };

    if (!filterData?.filter?.date?.value && filter?.filter?.date) {
      filter.filter.date.value = '';
    }

    if (
      !filterData?.filter?.resolvedDate?.value &&
      filter?.filter?.resolvedDate
    ) {
      filter.filter.resolvedDate.value = '';
    }

    if (!filterData?.filter?.amount?.value && filter?.filter.amount) {
      filter.filter.amount.value = 0;
    }

    return this.httpClient.post<PagedData>(
      `/api/receipt/group/${groupId}`,
      filterData
    );
  }
}
