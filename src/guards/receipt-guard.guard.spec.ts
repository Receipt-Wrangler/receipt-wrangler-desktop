import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { receiptGuardGuard } from './receipt-guard.guard';
import { Store } from '@ngxs/store';
import {
  ApiModule,
  Group,
  GroupMember,
  ReceiptService,
} from '@receipt-wrangler/receipt-wrangler-core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule } from '@ngxs/store';
import {
  Observable,
  catchError,
  finalize,
  of,
  take,
  tap,
  throwError,
} from 'rxjs';

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
        groupRole: GroupMember.GroupRoleEnum.VIEWER,
      },
      params: {
        id: 1,
      },
    };

    executeGuard(route, {} as any);

    expect(spy).toHaveBeenCalledWith(1, GroupMember.GroupRoleEnum.VIEWER);
  });

  it('should allow the user through', (done) => {
    spyOn(receiptService, 'hasAccessToReceipt').and.returnValue(
      of(true) as any
    );
    const route: any = {
      data: {
        groupRole: GroupMember.GroupRoleEnum.VIEWER,
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
  //       groupRole: GroupMember.GroupRoleEnum.VIEWER,
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
