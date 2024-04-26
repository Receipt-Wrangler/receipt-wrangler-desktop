import { Action, createSelector, StateContext } from "@ngxs/store";
import { PagedTableInterface } from "src/interfaces/paged-table.interface";
import { SetOrderBy, SetPage, SetPageSize, SetSortDirection, } from "./paged-table.state.actions";

export class PagedTableState {
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
}
