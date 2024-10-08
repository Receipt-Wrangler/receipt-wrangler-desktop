import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { take } from "rxjs";
import { SystemSettingsService } from "../../open-api";

export const supportedLocalesResolver: ResolveFn<string[]> = (route, state) => {
  const systemSettingsService = inject(SystemSettingsService);

  return systemSettingsService.getSupportedLocales()
    .pipe(
      take(1)
    );
};
