import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  SetPage,
  SetPageSize,
  SetReceiptFilter,
  SetReceiptFilterData,
} from './receipt-table.actions';
import { ReceiptTableInterface } from '../interfaces';
import { PagedRequestFilterOperation } from 'src/api/commands/paged-request-command';

@State<ReceiptTableInterface>({
  name: 'receiptTable',
  defaults: {
    page: 1,
    pageSize: 50,
    orderBy: 'date',
    sortDirection: 'desc',
    filter: {
      amount: {
        operation: PagedRequestFilterOperation.EQUALS,
        value: '',
      },
      name: {
        operation: PagedRequestFilterOperation.EQUALS,
        value: '',
      },
      paidBy: {
        operation: PagedRequestFilterOperation.EQUALS,
        value: '',
      },
    },
  },
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

  @Action(SetReceiptFilter)
  setReceiptFilter(
    { patchState }: StateContext<ReceiptTableInterface>,
    payload: SetReceiptFilter
  ) {
    patchState({
      filter: payload.data,
    });
  }
}
