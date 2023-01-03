import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Category, Tag } from 'src/models';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  public getAllTags(): Observable<Category[]> {
    return this.httpClient.get<Category[]>('/api/category').pipe(take(1));
  }
}
