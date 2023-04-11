import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { PagedData } from 'src/models/paged-data';
import { Receipt } from 'src/models/receipt';

@Injectable({
  providedIn: 'root',
})
export class ReceiptsService {
  constructor(private httpClient: HttpClient) {}

  public getPagedReceiptsForGroups(
    groupId: string,
    page: number,
    pageSize: number
  ): Observable<PagedData> {
    return this.httpClient.get<PagedData>(`/api/receipt/group/${groupId}`, {
      params: { page: page, pageSize: pageSize },
    });
  }

  public getReceiptById(id: string): Observable<Receipt> {
    return this.httpClient.get<Receipt>(`/api/receipt/${id}`).pipe(take(1));
  }

  public toggleIsResolved(id: string): Observable<void> {
    return this.httpClient
      .put<void>(`/api/receipt/${id}/toggleIsResolved`, {})
      .pipe(take(1));
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
