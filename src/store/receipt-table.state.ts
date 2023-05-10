import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  SetPage,
  SetPageSize,
  SetReceiptFilterData,
} from './receipt-table.actions';
import { ReceiptTableInterface } from '../interfaces';

@State<ReceiptTableInterface>({
  name: 'receiptTable',
  defaults: { page: 1, pageSize: 50, orderBy: 'date', sortDirection: 'desc' },
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

  @Selector()
  static filterData(state: ReceiptTableInterface): ReceiptTableInterface {
    return state;
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
      pageSize: payload.pageSize,
    });
  }

  @Action(SetReceiptFilterData)
  setReceiptFilterData(
    { patchState }: StateContext<ReceiptTableInterface>,
    payload: SetReceiptFilterData
  ) {
    patchState(payload.data);
  }
}
