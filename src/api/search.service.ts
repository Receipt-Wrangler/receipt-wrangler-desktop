import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResult } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private httpClient: HttpClient) {}

  public search(searchTerm: string): Observable<SearchResult[]> {
    return this.httpClient.get<SearchResult[]>(`/api/search`, {
      params: {
        searchTerm: searchTerm,
      },
    });
  }
}
