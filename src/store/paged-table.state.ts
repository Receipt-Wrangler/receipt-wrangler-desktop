import { Injectable } from '@angular/core';
import { Action, Selector, StateContext, createSelector } from '@ngxs/store';
import { PagedTableInterface } from 'src/interfaces/paged-table.interface';
import {
  SetOrderBy,
  SetPage,
  SetPageSize,
  SetPagedTableData,
  SetSortDirection,
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

  @Action(SetOrderBy)
  setOrderBy(
    { patchState }: StateContext<PagedTableInterface>,
    payload: SetOrderBy
  ) {
    patchState({
      orderBy: payload.orderBy,
    });
  }

  @Action(SetSortDirection)
  setSortDirection(
    { patchState }: StateContext<PagedTableInterface>,
    payload: SetSortDirection
  ) {
    patchState({
      sortDirection: payload.sortDirection,
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
