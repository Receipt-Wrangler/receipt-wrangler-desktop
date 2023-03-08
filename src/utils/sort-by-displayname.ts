import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Store } from '@ngxs/store';
import { UserState } from 'src/store/user.state';

@Injectable({
  providedIn: 'root',
})
export class SortByDisplayName {
  constructor(private store: Store) {}

  public sort(data: any[], sortState: Sort): any[] {
    const newData = Array.from(data);
    newData.sort((a, b) => {
      const aDisplayName =
        this.store.selectSnapshot(UserState.getUserById(a.userId.toString()))
          ?.displayName ?? '';
      const bDisplayName =
        this.store.selectSnapshot(UserState.getUserById(b.userId.toString()))
          ?.displayName ?? '';

      if (sortState.direction === 'asc') {
        return aDisplayName.localeCompare(bDisplayName);
      } else {
        return bDisplayName.localeCompare(aDisplayName);
      }
    });

    return newData;
  }
}
