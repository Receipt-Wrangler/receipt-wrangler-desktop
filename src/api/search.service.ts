import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private httpClient: HttpClient) {}

  public search(searchTerm: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`/api/search`, {
      params: {
        searchTerm: searchTerm,
      },
    });
  }
}
