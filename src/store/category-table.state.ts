import { Action, State, StateContext } from "@ngxs/store";
import { PagedTableInterface } from "src/interfaces/paged-table.interface";
import { SetOrderBy, SetPage, SetPageSize, SetSortDirection } from "./category-table.state.actions";
import { PagedTableState } from "./paged-table.state";

@State<PagedTableInterface>({
  name: "categoryTable",
  defaults: {
    page: 1,
    pageSize: 50,
    orderBy: "name",
    sortDirection: "desc",
  },
})
export class CategoryTableState extends PagedTableState {
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
