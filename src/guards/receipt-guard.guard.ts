import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { catchError, map, take, tap } from "rxjs";
import { ReceiptService } from "../open-api";
import { GroupState } from "../store";

export const receiptGuardGuard: CanActivateFn = (route, state) => {
  const receiptService: ReceiptService = inject(ReceiptService);
  const router: Router = inject(Router);
  const store: Store = inject(Store);

  const receiptId: number = Number.parseInt(route.params["id"]);
  const role = route.data["groupRole"];
  let result = false;

  return receiptService.hasAccessToReceipt(receiptId, role).pipe(
    take(1),
    tap(() => {
      result = true;
    }),
    catchError((err) => {
      result = false;
      router.navigate([store.selectSnapshot(GroupState.dashboardLink)]);
      return err;
    }),
    map(() => result)
  );
};
