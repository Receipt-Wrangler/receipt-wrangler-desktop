import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Group, GroupsService } from '@receipt-wrangler/receipt-wrangler-core';

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
