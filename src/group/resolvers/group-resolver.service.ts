import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GroupsService } from 'src/api/groups.service';
import { Group } from 'src/models';

@Injectable({
  providedIn: 'root',
})
export class GroupResolverService  {
  constructor(private groupsService: GroupsService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Group> {
    return this.groupsService.getGroupById(route.params['id']);
  }
}
