import { Observable } from "rxjs";

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Tag, TagService } from "@noah231515/receipt-wrangler-core";

@Injectable({
  providedIn: 'root',
})
export class TagsResolverService {
  constructor(private tagService: TagService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Tag[] | Observable<Tag[]> | Promise<Tag[]> {
    return this.tagService.getAllTags();
  }
}
