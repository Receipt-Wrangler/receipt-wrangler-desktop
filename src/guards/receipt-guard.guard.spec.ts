import { Observable, of, take, tap } from "rxjs";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { CanActivateFn } from "@angular/router";
import { NgxsModule, Store } from "@ngxs/store";
import { ApiModule, ReceiptService } from "@receipt-wrangler/receipt-wrangler-core";

import { receiptGuardGuard } from "./receipt-guard.guard";

describe('receiptGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => receiptGuardGuard(...guardParameters));
  let store: Store;
  let receiptService: ReceiptService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule, HttpClientTestingModule, NgxsModule.forRoot([])],
    });

    store = TestBed.inject(Store);
    receiptService = TestBed.inject(ReceiptService);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should call service with the correct arguments', () => {
    const spy = spyOn(receiptService, 'hasAccessToReceipt').and.returnValue(
      of(false) as any
    );
    const route: any = {
      data: {
        groupRole: GroupRole.VIEWER,
      },
      params: {
        id: 1,
      },
    };

    executeGuard(route, {} as any);

    expect(spy).toHaveBeenCalledWith(1, GroupRole.VIEWER);
  });

  it('should allow the user through', (done) => {
    spyOn(receiptService, 'hasAccessToReceipt').and.returnValue(
      of(true) as any
    );
    const route: any = {
      data: {
        groupRole: GroupRole.VIEWER,
      },
      params: {
        id: 1,
      },
    };

    (executeGuard(route, {} as any) as Observable<boolean>)
      .pipe(
        take(1),
        tap((result) => {
          expect(result).toEqual(true);
          done();
        })
      )
      .subscribe();
  });

  // TODO: Fix this test
  // it('should not allow the user through', (done) => {
  //   spyOn(receiptService, 'hasAccessToReceipt').and.returnValue(
  //     of(throwError('')) as any
  //   );
  //   const route: any = {
  //     data: {
  //       groupRole: GroupRole.VIEWER,
  //     },
  //     params: {
  //       id: 1,
  //     },
  //   };

  //   (executeGuard(route, {} as any) as Observable<boolean>)
  //     .pipe(take(1))
  //     .subscribe((result) => {
  //       expect(result).toEqual(false);
  //       done();
  //     });
  // });
});
