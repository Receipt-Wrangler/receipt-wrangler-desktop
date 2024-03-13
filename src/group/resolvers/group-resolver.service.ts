import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, tap } from "rxjs";
import { setEntityHeaderText } from "src/utils";
import { Group, GroupsService } from "../../api";

@Injectable({
  providedIn: "root",
})
export class GroupResolverService {
  constructor(private groupsService: GroupsService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Group> {
    return this.groupsService
      .getGroupById(route.params["id"] || route.parent?.params["id"])
      .pipe(
        tap((group) => {
          if (route.data["setHeaderText"] && route.data["formConfig"]) {
            route.data["formConfig"].headerText = setEntityHeaderText(
              group,
              "name",
              route.data["formConfig"],
              route.data["entityType"]
            );
          }
        })
      );
  }
}
