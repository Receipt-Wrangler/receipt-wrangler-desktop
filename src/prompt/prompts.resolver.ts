import { ResolveFn } from "@angular/router";
import { Prompt } from "../open-api";

export const promptsResolver: ResolveFn<Prompt[]> = (route, state) => {
  return [];
};
