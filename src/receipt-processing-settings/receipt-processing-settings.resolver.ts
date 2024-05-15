import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { take } from "rxjs";
import { ReceiptProcessingSettings, ReceiptProcessingSettingsService } from "../open-api";

export const receiptProcessingSettingsResolver: ResolveFn<ReceiptProcessingSettings> = (route, state) => {
  const service = inject(ReceiptProcessingSettingsService);

  return service.getReceiptProcessingSettingsById(route.params["id"])
    .pipe(take(1));
};
