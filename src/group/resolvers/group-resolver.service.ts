import { Observable, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Group, GroupsService } from '@receipt-wrangler/receipt-wrangler-core';
import { setEntityHeaderText } from 'src/utils';

@Injectable({
  providedIn: 'root',
})
export class GroupResolverService {
  constructor(private groupsService: GroupsService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Group> {
    return this.groupsService.getGroupById(route.params['id']).pipe(
      tap((group) => {
        if (route.data['setHeaderText'] && route.data['formConfig']) {
          route.data['formConfig'].headerText = setEntityHeaderText(
            group,
            'name',
            route.data['formConfig'],
            route.data['entityType']
          );
        }
      })
    );
  }
}
