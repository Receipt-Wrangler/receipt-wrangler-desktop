import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ReceiptQueueService {
  constructor(
    private router: Router,
  ) { }

  public initQueueAndNavigate(receiptIds: string[], indexToStartAt: number = 0): void {
    this.router.navigate([`/receipts/${receiptIds[indexToStartAt]}/edit`], {
      queryParams: {
        ids: receiptIds,
      }
    });
  }

  public queueNext(currentIndex: number, receiptIds: string[]): void {
    this.initQueueAndNavigate(receiptIds, currentIndex + 1);
  }

  public queuePrevious(currentIndex: number, receiptIds: string[]): void {
    this.initQueueAndNavigate(receiptIds, currentIndex - 1);
  }
}
