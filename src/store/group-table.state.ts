import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { AssociatedGroup, PagedGroupRequestCommand, SortDirection } from "../open-api";
import { SetFilter, SetOrderBy, SetPage, SetPageSize, SetSortDirection } from "./group-table.state.actions";
import { PagedTableState } from "./paged-table.state";

@State<PagedGroupRequestCommand>({
  name: "groupTable",
  defaults: {
    page: 1,
    pageSize: 50,
    orderBy: "name",
    sortDirection: SortDirection.Desc,
    filter: {
      associatedGroup: AssociatedGroup.Mine
    }
  },
})
@Injectable()
export class GroupTableState extends PagedTableState {
  @Action(SetPage)
  setPage({ patchState }: StateContext<PagedGroupRequestCommand>, payload: SetPage) {
    patchState({
      page: payload.page,
    });
  }

  @Action(SetPageSize)
  setPageSize(
    { patchState }: StateContext<PagedGroupRequestCommand>,
    payload: SetPageSize
  ) {
    patchState({
      pageSize: payload.pageSize,
    });
  }

  @Action(SetOrderBy)
  setOrderBy(
    { patchState }: StateContext<PagedGroupRequestCommand>,
    payload: SetOrderBy
  ) {
    patchState({
      orderBy: payload.orderBy,
    });
  }

  @Action(SetSortDirection)
  setSortDirection(
    { patchState }: StateContext<PagedGroupRequestCommand>,
    payload: SetSortDirection
  ) {
    patchState({
      sortDirection: payload.sortDirection,
    });
  }

  @Action(SetFilter)
  setFilter(
    { patchState }: StateContext<PagedGroupRequestCommand>,
    payload: SetFilter
  ) {
    patchState({
      filter: payload.filter,
    });
  }
}
