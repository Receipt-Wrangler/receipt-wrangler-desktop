import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { take } from "rxjs";
import { Prompt, PromptService } from "../open-api";

export const promptResolver: ResolveFn<Prompt> = (route, state) => {
  const service = inject(PromptService);
  return service.getPromptById(route.params["id"]).pipe(take(1));
};
