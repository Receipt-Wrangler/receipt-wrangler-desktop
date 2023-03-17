import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private httpClient: HttpClient) {}

  public addComment(comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(`/api/comments/`, comment);
  }
}
