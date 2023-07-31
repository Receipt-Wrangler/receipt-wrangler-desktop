import { Observable } from "rxjs";

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Category, CategoryService } from "@noah231515/receipt-wrangler-core";

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
