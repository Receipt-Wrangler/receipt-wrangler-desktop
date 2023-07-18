import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/api-new';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private httpClient: HttpClient) {}

  public addComment(comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(`/api/comment/`, comment);
  }

  public deleteComment(commentId: string): Observable<void> {
    return this.httpClient.delete<void>(`/api/comment/${commentId}`);
  }
}
