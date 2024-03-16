import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Tag, TagService } from "../open-api";

@Injectable({
  providedIn: "root",
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
