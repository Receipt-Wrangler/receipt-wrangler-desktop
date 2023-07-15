import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Category, CategoryService } from 'src/api-new';

@Injectable({
  providedIn: 'root',
})
export class CategoriesResolverService {
  constructor(private categoryService: CategoryService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Category[] | Observable<Category[]> | Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }
}
