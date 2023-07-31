import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { FeatureConfigState } from '@noah231515/receipt-wrangler-core';

@Injectable({
  providedIn: 'root',
})
export class FeatureGuard {
  constructor(private store: Store) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.store.selectSnapshot(
      FeatureConfigState.hasFeature(route.data['feature'])
    );
  }
}
