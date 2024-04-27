import { createSelector } from "@ngxs/store";
import { PagedTableInterface } from "src/interfaces/paged-table.interface";

export class PagedTableState {
  static get state() {
    return createSelector([this], (state: PagedTableInterface) => {
      return state;
    });
  }
}
