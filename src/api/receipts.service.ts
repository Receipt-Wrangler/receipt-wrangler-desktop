import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { Store } from '@ngxs/store';
import { Observable, take } from 'rxjs';
import { PagedData } from 'src/models/paged-data';
import { Receipt } from 'src/models/receipt';
import { ReceiptTableState } from 'src/store/receipt-table.state';

export interface BulkResolve {
  receiptIds: number[];
  comment: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReceiptsService {
  constructor(private httpClient: HttpClient, private store: Store) {}

  public getPagedReceiptsForGroups(
    groupId: string,
    page?: number,
    pageSize?: number,
    orderBy?: string,
    sortDirection?: SortDirection
  ): Observable<PagedData> {
    const filter = this.store.selectSnapshot(ReceiptTableState.filterData);
    let filterData: any = {
      page: page ?? filter.page,
      pageSize: pageSize ?? filter.pageSize,
      orderBy: orderBy ?? filter.orderBy,
      sortDirection: sortDirection ?? filter.sortDirection,
    };

    return this.httpClient.post<PagedData>(
      `/api/receipt/group/${groupId}`,
      filterData
    );
  }

  public getReceiptById(id: string): Observable<Receipt> {
    return this.httpClient.get<Receipt>(`/api/receipt/${id}`).pipe(take(1));
  }

  public toggleIsResolved(id: string): Observable<void> {
    return this.httpClient
      .put<void>(`/api/receipt/${id}/toggleIsResolved`, {})
      .pipe(take(1));
  }

  public bulkResolveReceipts(bulkResolve: BulkResolve): Observable<Receipt[]> {
    return this.httpClient.post<Receipt[]>(
      `/api/receipt/bulkResolve`,
      bulkResolve
    );
  }

  public createReceipt(receipt: Receipt): Observable<Receipt> {
    return this.httpClient.post<Receipt>(`/api/receipt`, receipt).pipe(take(1));
  }

  public updateReceipt(id: string, receipt: Receipt): Observable<void> {
    return this.httpClient
      .put<void>(`/api/receipt/${id}`, receipt)
      .pipe(take(1));
  }

  public deleteReceipt(id: string): Observable<void> {
    return this.httpClient.delete<void>(`/api/receipt/${id}`).pipe(take(1));
  }

  public duplicateReceipt(id: string): Observable<Receipt> {
    return this.httpClient.post<Receipt>(`/api/receipt/${id}/duplicate`, {});
  }
}
