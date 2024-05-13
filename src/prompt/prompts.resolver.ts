import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { map } from "rxjs";
import { PagedRequestCommand, Prompt, PromptService } from "../open-api";

export const promptsResolver: ResolveFn<Prompt[]> = (route, state) => {
  const promptService = inject(PromptService);
  const command: PagedRequestCommand = {
    page: 1,
    pageSize: -1,
    orderBy: "name",
    sortDirection: "asc",
  };
  return promptService.getPagedPrompts(command)
    .pipe(
      map((pagedData) => {
        return pagedData.data as Prompt[];
      })
    );
};
