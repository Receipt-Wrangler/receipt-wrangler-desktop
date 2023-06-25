import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { PagedRequestFilterOperation } from 'src/api/commands/paged-request-command';
import { ReceiptTableInterface } from '../interfaces';
import {
  ResetReceiptFilter,
  SetPage,
  SetPageSize,
  SetReceiptFilter,
  SetReceiptFilterData,
} from './receipt-table.actions';

export const defaultReceiptFilter = {
  date: { operation: PagedRequestFilterOperation.EQUALS, value: '' },
  amount: {
    operation: PagedRequestFilterOperation.EQUALS,
    value: '',
  },
  name: {
    operation: PagedRequestFilterOperation.EQUALS,
    value: '',
  },
  paidBy: {
    operation: PagedRequestFilterOperation.CONTAINS,
    value: [],
  },
  categories: {
    operation: PagedRequestFilterOperation.CONTAINS,
    value: [],
  },
  tags: {
    operation: PagedRequestFilterOperation.CONTAINS,
    value: [],
  },
  status: {
    operation: PagedRequestFilterOperation.CONTAINS,
    value: [],
  },
  resolvedDate: {
    operation: PagedRequestFilterOperation.EQUALS,
    value: '',
  },
};

// TODO: look into fixing date equals
@State<ReceiptTableInterface>({
  name: 'receiptTable',
  defaults: {
    page: 1,
    pageSize: 50,
    orderBy: 'date',
    sortDirection: 'desc',
    filter: defaultReceiptFilter,
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

  @Selector()
  static numFiltersApplied(state: ReceiptTableInterface): number {
    let filtersApplied = 0;
    const filter: any = state.filter;

    Object.keys(filter).forEach((key) => {
      if (filter[key]?.value?.length > 0) {
        filtersApplied += 1;
      }
    });

    return filtersApplied;
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

  @Action(ResetReceiptFilter)
  resetFilter({ patchState }: StateContext<ReceiptTableInterface>) {
    patchState({
      filter: defaultReceiptFilter,
    });
  }
}
