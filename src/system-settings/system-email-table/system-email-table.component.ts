import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Select, Store } from "@ngxs/store";
import { Observable, take, tap } from "rxjs";
import { PagedTableInterface } from "../../interfaces/paged-table.interface";
import { SystemEmail, SystemEmailService } from "../../open-api";
import { SnackbarService } from "../../services";
import { ConfirmationDialogComponent } from "../../shared-ui/confirmation-dialog/confirmation-dialog.component";
import { SystemEmailTableState } from "../../store/system-email-table.state";
import { SetOrderBy, SetPage, SetPageSize, SetSortDirection } from "../../store/system-email-table.state.actions";
import { TableColumn } from "../../table/table-column.interface";

@Component({
  selector: "app-system-email-table",
  templateUrl: "./system-email-table.component.html",
  styleUrl: "./system-email-table.component.scss"
})
export class SystemEmailTableComponent implements OnInit, AfterViewInit {
  @ViewChild("usernameCell") public usernameCell!: TemplateRef<any>;

  @ViewChild("hostCell") public hostCell!: TemplateRef<any>;

  @ViewChild("createdAtCell") public createdAtCell!: TemplateRef<any>;

  @ViewChild("updatedAtCell") public updatedAtCell!: TemplateRef<any>;

  @ViewChild("actionsCell") public actionsCell!: TemplateRef<any>;

  @Select(SystemEmailTableState.state) public tableState!: Observable<PagedTableInterface>;

  public displayedColumns: string[] = [];

  public columns: TableColumn[] = [];

  public dataSource: MatTableDataSource<SystemEmail> = new MatTableDataSource<SystemEmail>([]);

  public totalCount: number = 0;

  constructor(
    private matDialog: MatDialog,
    private snackbarService: SnackbarService,
    private store: Store,
    private systemEmailService: SystemEmailService,
  ) {
  }

  public ngOnInit(): void {
    this.getTableData();
  }

  public ngAfterViewInit(): void {
    this.initTable();
  }

  private initTable(): void {
    this.setColumns();
  }

  private setColumns(): void {

    const columns = [
      {
        columnHeader: "Username",
        matColumnDef: "username",
        template: this.usernameCell,
        sortable: true
      },
      {
        columnHeader: "Host",
        matColumnDef: "host",
        template: this.hostCell,
        sortable: true
      },
      {
        columnHeader: "Created At",
        matColumnDef: "created_at",
        template: this.createdAtCell,
        sortable: true
      },
      {
        columnHeader: "Updated At",
        matColumnDef: "updated_at",
        template: this.updatedAtCell,
        sortable: true
      },
      {
        columnHeader: "Actions",
        matColumnDef: "actions",
        template: this.actionsCell,
        sortable: false
      },

    ] as TableColumn[];

    const state = this.store.selectSnapshot(SystemEmailTableState.state);
    if (state.orderBy) {
      const column = columns.find((c) => c.matColumnDef === state.orderBy);
      if (column) {
        column.defaultSortDirection = state.sortDirection;
      }
    }

    this.columns = columns;
    this.displayedColumns = ["username", "host", "created_at", "updated_at", "actions"];
  }

  private getTableData(): void {
    const pagedRequestCommand = this.store.selectSnapshot(SystemEmailTableState.state);
    this.systemEmailService.getPagedSystemEmails(pagedRequestCommand)
      .pipe(
        take(1),
        tap((pagedData) => {
          this.dataSource = new MatTableDataSource(pagedData.data as SystemEmail[]);
          this.totalCount = pagedData.totalCount;
        })
      )
      .subscribe();
  }

  public sorted(sort: Sort): void {
    this.store.dispatch(new SetOrderBy(sort.active));
    this.store.dispatch(new SetSortDirection(sort.direction));

    this.getTableData();
  }

  public pageChanged(pageEvent: PageEvent): void {
    const newPage = pageEvent.pageIndex + 1;

    this.store.dispatch(new SetPage(newPage));
    this.store.dispatch(new SetPageSize(pageEvent.pageSize));

    this.getTableData();
  }

  public deleteButtonClicked(id: number, index: number): void {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent);
    const email = this.dataSource.data[index];

    dialogRef.componentInstance.headerText = "Delete System Email";
    dialogRef.componentInstance.dialogContent = `Are you sure you want to delete the email: ${email.username}?`;

    dialogRef.afterClosed()
      .pipe(
        take(1),
        tap((result) => {
          if (result) {
            this.callDeleteApi(id, index);
          }
        })
      )
      .subscribe();
  }

  private callDeleteApi(id: number, index: number): void {
    this.systemEmailService.deleteSystemEmailById(id)
      .pipe(
        take(1),
        tap(() => {
          this.getTableData();
          const data = Array.from(this.dataSource.data);
          data.splice(index, 1);
          this.dataSource = new MatTableDataSource(data);
          this.snackbarService.success("System email deleted successfully");
        })
      )
      .subscribe();
  }
}
