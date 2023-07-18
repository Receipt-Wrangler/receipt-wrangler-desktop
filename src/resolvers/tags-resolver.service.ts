import { Observable } from "rxjs";
import { Tag, TagService } from "src/api";

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

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
