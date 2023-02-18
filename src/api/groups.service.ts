import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Group } from 'src/models/group';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  constructor(private httpClient: HttpClient) {}

  public GetGroupsForUser(): Observable<Group[]> {
    return this.httpClient.get<Group[]>('/api/group').pipe(take(1));
  }

  public createGroup(group: Group): Observable<Group> {
    return this.httpClient.post<Group>('/api/group', group).pipe();
  }
}
