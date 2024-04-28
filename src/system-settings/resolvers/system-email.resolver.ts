import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { take } from "rxjs";
import { SystemEmail, SystemEmailService } from "../../open-api";

export const systemEmailResolver: ResolveFn<SystemEmail> = (route, state) => {
  const id = route.params["id"];
  return inject(SystemEmailService).getSystemEmailById(id).pipe(take(1));
};
