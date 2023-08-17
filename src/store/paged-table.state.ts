import { Injectable } from '@angular/core';
import { Action, Selector, StateContext, createSelector } from '@ngxs/store';
import { PagedTableInterface } from 'src/interfaces/paged-table.interface';
import {
  SetPage,
  SetPageSize,
  SetPagedTableData,
} from './paged-table.state.actions';

export class PagedTableState {
  static get page() {
    return createSelector([this], (state: PagedTableInterface) => {
      return state.page;
    });
  }

  static get pageSize() {
    return createSelector([this], (state: PagedTableInterface) => {
      return state.pageSize;
    });
  }

  static get state() {
    return createSelector([this], (state: PagedTableInterface) => {
      return state;
    });
  }

  @Action(SetPage)
  setPage({ patchState }: StateContext<PagedTableInterface>, payload: SetPage) {
    patchState({
      page: payload.page,
    });
  }

  @Action(SetPageSize)
  setPageSize(
    { patchState }: StateContext<PagedTableInterface>,
    payload: SetPageSize
  ) {
    patchState({
      pageSize: payload.pageSize,
    });
  }

  @Action(SetPagedTableData)
  setReceiptFilterData(
    { patchState }: StateContext<PagedTableInterface>,
    payload: SetPagedTableData
  ) {
    patchState(payload.data);
  }
}
