import { Observable } from "rxjs";
import { Group, GroupsService } from "src/api";

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class GroupResolverService {
  constructor(private groupsService: GroupsService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Group> {
    return this.groupsService.getGroupById(route.params['id']);
  }
}
