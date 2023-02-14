import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { FeatureConfigState } from 'src/store/feature-config.state';

@Injectable({
  providedIn: 'root',
})
export class FeatureGuard implements CanActivate {
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
