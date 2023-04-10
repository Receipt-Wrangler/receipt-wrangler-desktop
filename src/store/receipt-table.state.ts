import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetPage, SetPageSize } from './receipt-table.actions';

export interface ReceiptTableInterface {
  page: number;
  pageSize: number;
}

@State<ReceiptTableInterface>({
  name: 'receiptTable',
  defaults: { page: 1, pageSize: 25 },
})
@Injectable()
export class ReceiptTableState {
  @Selector()
  static page(state: ReceiptTableInterface): number {
    return state.page;
  }

  @Selector()
  static pageSize(state: ReceiptTableInterface): number {
    return state.pageSize;
  }

  @Action(SetPage)
  setPage(
    { patchState }: StateContext<ReceiptTableInterface>,
    payload: SetPage
  ) {
    patchState({
      page: payload.page,
    });
  }

  @Action(SetPageSize)
  setPageSize(
    { patchState }: StateContext<ReceiptTableInterface>,
    payload: SetPageSize
  ) {
    patchState({
      page: payload.pageSize,
    });
  }
}
