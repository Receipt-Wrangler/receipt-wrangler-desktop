import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/api/categories.service';
import { Category } from 'src/models';

@Injectable({
  providedIn: 'root',
})
export class CategoriesResolverService  {
  constructor(private categoriesService: CategoriesService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Category[] | Observable<Category[]> | Promise<Category[]> {
    return this.categoriesService.getAllTags();
  }
}
