import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { PagedTableInterface } from "../../interfaces/paged-table.interface";
import { TableColumn } from "../../table/table-column.interface";

@Component({
  selector: "app-base-table",
  templateUrl: "./base-table.component.html",
  styleUrl: "./base-table.component.scss"
})
export class BaseTableComponent<T> {
  public columns: TableColumn[] = [];

  public displayedColumns: string[] = [];

  public dataSource = new MatTableDataSource<T>([]);

  public totalCount = 0;

  public setInitialSortedColumn(state: PagedTableInterface, columns: TableColumn[]): void {
    if (state.orderBy) {
      const column = columns.find((c) => c.matColumnDef === state.orderBy);
      if (column) {
        column.defaultSortDirection = state.sortDirection;
      }
    }
  }
}
