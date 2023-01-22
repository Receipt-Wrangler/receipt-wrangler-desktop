import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ReceiptsService } from 'src/api/receipts.service';
import { Receipt } from 'src/models';

@Injectable({
  providedIn: 'root',
})
export class ReceiptResolverService implements Resolve<Receipt> {
  constructor(private receiptsService: ReceiptsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Receipt | Observable<Receipt> | Promise<Receipt> {
    return this.receiptsService.getReceiptById(route.params['id']);
  }
}
