import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReceiptImagesService {
  constructor(private httpClient: HttpClient) {}

  public getImageFiles(id: string): Observable<string> {
    return this.httpClient.get<string>(`/api/receiptImage/${id}`).pipe(take(1));
  }
}
