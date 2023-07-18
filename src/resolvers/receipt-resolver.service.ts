import { Observable } from "rxjs";
import { Receipt, ReceiptService } from "src/api";

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class ReceiptResolverService {
  constructor(private receiptService: ReceiptService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Receipt | Observable<Receipt> | Promise<Receipt> {
    return this.receiptService.getReceiptById(route.params['id']);
  }
}
