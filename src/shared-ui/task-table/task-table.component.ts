import { AfterViewInit, Component, Inject, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { take, tap } from "rxjs";
import { AssociatedEntityType, GetSystemTaskCommand, SystemTask, SystemTaskService } from "../../open-api";
import { BaseTableService } from "../../services/base-table.service";
import { TABLE_SERVICE_INJECTION_TOKEN } from "../../services/injection-tokens/table-service";
import { TableColumn } from "../../table/table-column.interface";

@Component({
  selector: "app-task-table",
  templateUrl: "./task-table.component.html",
  styleUrl: "./task-table.component.scss"
})
export class TaskTableComponent implements OnInit, AfterViewInit {
  @ViewChild("typeCell") public typeCell!: TemplateRef<any>;

  @Input() public associatedEntityType?: AssociatedEntityType;

  @Input() public associatedEntityId?: number;

  public displayedColumns: string[] = [];

  public columns: TableColumn[] = [];

  public dataSource: MatTableDataSource<SystemTask> = new MatTableDataSource<SystemTask>([]);

  public totalCount: number = 0;


  constructor(
    @Inject(TABLE_SERVICE_INJECTION_TOKEN) public tableService: BaseTableService,
    private systemTaskService: SystemTaskService
  ) {}

  public ngOnInit(): void {
    this.getTableData();
  }

  private getTableData(): void {
    const pagedCommand = this.tableService.getPagedRequestCommand();
    const getSystemTaskCommand: GetSystemTaskCommand = {
      page: pagedCommand.page,
      pageSize: pagedCommand.pageSize,
      orderBy: pagedCommand.orderBy,
      sortDirection: pagedCommand.sortDirection,
      associatedEntityId: this.associatedEntityId,
      associatedEntityType: this.associatedEntityType
    };

    this.systemTaskService.getPagedSystemTasks(getSystemTaskCommand)
      .pipe(
        take(1),
        tap((pagedData) => {
          this.dataSource = new MatTableDataSource<SystemTask>(pagedData.data as SystemTask[]);
          this.totalCount = pagedData.totalCount;
        })
      )
      .subscribe();
  }

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

  public sorted(sort: Sort): void {
    this.tableService.setOrderBy(sort);
    this.tableService.setSortDirection(sort.direction);

    this.getTableData();
  }

  public pageChanged(event: PageEvent): void {
    const newPage = event.pageIndex + 1;

    this.tableService.setPage(newPage);
    this.tableService.setPageSize(event.pageSize);

    this.getTableData();
  }
}
