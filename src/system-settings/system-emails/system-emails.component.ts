import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Store } from "@ngxs/store";
import { take, tap } from "rxjs";
import { SystemEmail, SystemEmailService } from "../../open-api";
import { SystemEmailTableState } from "../../store/system-email-table.state";
import { TableColumn } from "../../table/table-column.interface";

@Component({
  selector: "app-system-emails",
  templateUrl: "./system-emails.component.html",
  styleUrl: "./system-emails.component.scss"
})
export class SystemEmailsComponent implements OnInit {
  public displayedColumns: string[] = [];

  public columns: TableColumn[] = [];

  public dataSource: MatTableDataSource<SystemEmail> = new MatTableDataSource<SystemEmail>(
    []);

  constructor(private systemEmailService: SystemEmailService, private store: Store) {
  }


  public ngOnInit(): void {
    this.initTableData();
  }

  private initTableData(): void {
    const pagedRequestCommand = this.store.selectSnapshot(SystemEmailTableState.state);
    console.warn(pagedRequestCommand);
    this.systemEmailService.getPagedSystemEmails(pagedRequestCommand)
      .pipe(
        take(1),
        tap((systemEmails) => {
          this.dataSource = new MatTableDataSource(systemEmails);
        })
      )
      .subscribe();
  }
}
