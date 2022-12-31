import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Receipt } from 'src/models/receipt';

@Injectable({
  providedIn: 'root',
})
export class ReceiptsService {
  constructor(private httpClient: HttpClient) {}

  public getAllReceipts(): Observable<Receipt[]> {
    return this.httpClient.get<Receipt[]>('/api/receipt').pipe(take(1));
  }

  public toggleIsResolved(id: string): Observable<void> {
    return this.httpClient
      .put<void>(`/api/receipt/${id}/toggleIsResolved`, {})
      .pipe(take(1));
  }

  public deleteReceipt(id: string): Observable<void> {
    return this.httpClient.delete<void>(`/api/receipt/${id}`).pipe(take(1));
  }
}
