import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { TableColumn } from "../../table/table-column.interface";

@Component({
  selector: "app-system-emails",
  templateUrl: "./system-emails.component.html",
  styleUrl: "./system-emails.component.scss"
})
export class SystemEmailsComponent {
  public displayedColumns: string[] = [];

  public columns: TableColumn[] = [];

  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(
    []);

}
