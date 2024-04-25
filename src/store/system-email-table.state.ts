import { Injectable } from "@angular/core";
import { State } from "@ngxs/store";
import { PagedTableInterface } from "src/interfaces/paged-table.interface";
import { SortDirection } from "../open-api";
import { PagedTableState } from "./paged-table.state";

@State<PagedTableInterface>({
  name: "systemEmailTable",
  defaults: {
    page: 1,
    pageSize: 50,
    orderBy: "username",
    sortDirection: SortDirection.Desc,
  },
})
@Injectable()
export class SystemEmailTableState extends PagedTableState {}
