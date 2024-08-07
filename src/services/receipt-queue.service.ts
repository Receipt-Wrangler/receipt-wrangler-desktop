import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ReceiptQueueService {
  constructor(
    private router: Router
  ) { }

  public initQueueAndNavigate(receiptIds: string[]): void {
    this.router.navigate([`/receipts/${receiptIds[0]}/edit`], {
      queryParams: {
        ids: receiptIds,
      }
    });
  }
}
