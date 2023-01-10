import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { FileData } from 'src/models/file-data';

@Injectable({
  providedIn: 'root',
})
export class ReceiptImagesService {
  constructor(private httpClient: HttpClient) {}

  public getImageFiles(id: string): Observable<string> {
    return this.httpClient
      .get<string>(`/api/receiptImage/${id}`, { responseType: 'text' as any })
      .pipe(take(1));
  }

  public uploadImage(fileData: FileData): Observable<void> {
    return this.httpClient
      .post<void>(`/api/receiptImage`, fileData)
      .pipe(take(1));
  }
}
