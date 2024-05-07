import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Select, Store } from "@ngxs/store";
import { Observable, take, tap } from "rxjs";
import { PagedTableInterface } from "../../interfaces/paged-table.interface";
import { Prompt, PromptService } from "../../open-api";
import { PromptTableState } from "../../store/prompt-table.state";
import { SetOrderBy, SetPage, SetPageSize, SetSortDirection } from "../../store/prompt-table.state.actions";
import { TableColumn } from "../../table/table-column.interface";

@Component({
  selector: "app-prompt-table",
  templateUrl: "./prompt-table.component.html",
  styleUrl: "./prompt-table.component.scss"
})
export class PromptTableComponent implements OnInit, AfterViewInit {
  @Select(PromptTableState.state) public tableState!: Observable<PagedTableInterface>;

  @ViewChild("nameCell") public nameCell!: TemplateRef<any>;

  @ViewChild("descriptionCell") public descriptionCell!: TemplateRef<any>;

  @ViewChild("createdAtCell") public createdAtCell!: TemplateRef<any>;

  @ViewChild("updatedAtCell") public updatedAtCell!: TemplateRef<any>;

  public columns: TableColumn[] = [];

  public displayedColumns: string[] = [];

  public dataSource = new MatTableDataSource<Prompt>([]);

  public totalCount = 0;


  constructor(private store: Store, private promptService: PromptService) {}

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
        columnHeader: "Name",
        matColumnDef: "name",
        template: this.nameCell,
        sortable: true
      },
      {
        columnHeader: "Description",
        matColumnDef: "description",
        template: this.descriptionCell,
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
    ] as TableColumn[];

    const state = this.store.selectSnapshot(PromptTableState.state);
    if (state.orderBy) {
      const column = columns.find((c) => c.matColumnDef === state.orderBy);
      if (column) {
        column.defaultSortDirection = state.sortDirection;
      }
    }

    this.columns = columns;
    this.displayedColumns = ["name", "description", "created_at", "updated_at"];
  }

  private getTableData(): void {
    const pagedRequestCommand = this.store.selectSnapshot(PromptTableState.state);
    this.promptService.getPagedPrompts(pagedRequestCommand)
      .pipe(
        take(1),
        tap((pagedData) => {
          this.dataSource = new MatTableDataSource(pagedData.data as Prompt[]);
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

  /*  public deleteButtonClicked(id: number, index: number): void {
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
    }*/
}
