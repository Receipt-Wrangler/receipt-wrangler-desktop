import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TagsService } from 'src/api/tags.service';
import { Tag } from 'src/models';

@Injectable({
  providedIn: 'root',
})
export class TagsResolverService  {
  constructor(private tagsResolverService: TagsService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Tag[] | Observable<Tag[]> | Promise<Tag[]> {
    return this.tagsResolverService.getAllTags();
  }
}
