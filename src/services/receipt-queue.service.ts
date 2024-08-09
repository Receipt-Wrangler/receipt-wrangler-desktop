import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

export enum QueueMode {
  VIEW = "view",
  EDIT = "edit",
}

@Injectable({
  providedIn: "root"
})
export class ReceiptQueueService {
  constructor(
    private router: Router,
  ) { }

  // TODO: support full dashboard
  public initQueueAndNavigate(receiptIds: string[], mode: QueueMode, indexToStartAt: number = 0): void {
    this.router.navigate([`/receipts/${receiptIds[indexToStartAt]}/${mode}`], {
      queryParams: {
        ids: receiptIds,
        queueMode: mode,
      }
    });
  }

  public queueNext(currentIndex: number, receiptIds: string[], mode: QueueMode): void {
    this.initQueueAndNavigate(receiptIds, mode, currentIndex + 1);
  }

  public queuePrevious(currentIndex: number, receiptIds: string[], mode: QueueMode): void {
    this.initQueueAndNavigate(receiptIds, mode, currentIndex - 1);
  }
}
