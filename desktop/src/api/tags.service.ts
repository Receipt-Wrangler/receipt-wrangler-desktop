import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Category, Receipt, Tag } from 'src/models';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private httpClient: HttpClient) {}

  public getAllTags(): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>('/api/tag').pipe(take(1));
  }
}
