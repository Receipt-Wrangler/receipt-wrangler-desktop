import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { SystemTask } from "../../open-api";
import { TableColumn } from "../../table/table-column.interface";

@Component({
  selector: "app-task-table",
  templateUrl: "./task-table.component.html",
  styleUrl: "./task-table.component.scss"
})
export class TaskTableComponent implements OnInit, AfterViewInit {
  @ViewChild("typeCell") public typeCell!: TemplateRef<any>;

  public displayedColumns: string[] = [];

  public columns: TableColumn[] = [];

  public dataSource: MatTableDataSource<SystemTask> = new MatTableDataSource<SystemTask>([]);

  public totalCount: number = 0;

  public ngOnInit(): void {
    this.getTableData();
  }

  private getTableData(): void {}

  public ngAfterViewInit(): void {
    this.initTable();
  }

  private initTable(): void {
    this.setColumns();
  }

  private setColumns(): void {
    this.columns = [
      {
        columnHeader: "Type",
        matColumnDef: "type",
        template: this.typeCell,
        sortable: true
      }];

    this.displayedColumns = ["type"];
  }
}
