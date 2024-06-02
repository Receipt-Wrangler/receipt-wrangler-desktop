import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Observable, take, tap } from "rxjs";
import { PagedTableInterface } from "../../interfaces/paged-table.interface";
import { Prompt, PromptService, ReceiptProcessingSettings, UpsertPromptCommand } from "../../open-api";
import { SnackbarService } from "../../services";
import { ConfirmationDialogComponent } from "../../shared-ui/confirmation-dialog/confirmation-dialog.component";
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

  @ViewChild("actionsCell") public actionsCell!: TemplateRef<any>;

  public columns: TableColumn[] = [];

  public displayedColumns: string[] = [];

  public dataSource = new MatTableDataSource<Prompt>([]);

  public totalCount = 0;

  public receiptProcessingSettings: ReceiptProcessingSettings[] = [];

  public relatedPromptMap: Map<number, ReceiptProcessingSettings[]> = new Map<number, ReceiptProcessingSettings[]>();


  constructor(
    private matDialog: MatDialog,
    private promptService: PromptService,
    private router: Router,
    private snackbarService: SnackbarService,
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.receiptProcessingSettings = this.activatedRoute.snapshot.data["allReceiptProcessingSettings"];
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
      {
        columnHeader: "Actions",
        matColumnDef: "actions",
        template: this.actionsCell,
        sortable: false
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
    this.displayedColumns = ["name", "description", "created_at", "updated_at", "actions"];
  }

  private getTableData(): void {
    const pagedRequestCommand = this.store.selectSnapshot(PromptTableState.state);
    this.promptService.getPagedPrompts(pagedRequestCommand)
      .pipe(
        take(1),
        tap((pagedData) => {
          this.dataSource = new MatTableDataSource(pagedData.data as Prompt[]);
          this.totalCount = pagedData.totalCount;
          this.setPromptsWithRelatedData(pagedData.data as Prompt[]);
        })
      )
      .subscribe();
  }

  private setPromptsWithRelatedData(prompts: Prompt[]): void {
    const map = new Map<number, ReceiptProcessingSettings[]>();
    for (const prompt of prompts) {
      const related = this.receiptProcessingSettings.filter((r) => r.promptId === prompt.id);
      map.set(prompt.id, related);
    }

    this.relatedPromptMap = map;
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

  public deletePrompt(id: number, index: number): void {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent);
    const prompt = this.dataSource.data[index];

    dialogRef.componentInstance.headerText = "Delete Prompt";
    dialogRef.componentInstance.dialogContent = `Are you sure you want to delete the prompt: ${prompt.name}?`;

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
    this.promptService.deletePromptById(id)
      .pipe(
        take(1),
        tap(() => {
          this.getTableData();
          const data = Array.from(this.dataSource.data);
          data.splice(index, 1);
          this.dataSource = new MatTableDataSource(data);
          this.snackbarService.success("Prompt deleted successfully");
        })
      )
      .subscribe();
  }

  public duplicatePrompt(id: number): void {
    const prompt = this.dataSource.data.find((p) => p.id === id);
    if (!prompt) {
      return;
    }

    const command: UpsertPromptCommand = {
      name: prompt.name + " duplicate",
      description: prompt.description,
      prompt: prompt.prompt,
    };

    this.promptService.createPrompt(command)
      .pipe(
        take(1),
        tap((prompt) => {
          this.router.navigate([`/system-settings/prompts/${prompt.id}/view`]);
          this.snackbarService.success(`Prompt ${prompt.name} duplicated successfully`);
        }),
      )
      .subscribe();
  }

  public createDefaultPrompt(): void {
    this.promptService.createDefaultPrompt()
      .pipe(
        take(1),
        tap((prompt) => {
          this.router.navigate([`/system-settings/prompts/${prompt.id}/view`]);
          this.snackbarService.success(`Default prompt created successfully`);
        })
      )
      .subscribe();
  }

  public disabledDeleteButtonClicked(promptId: number): void {
    const mapData = this.relatedPromptMap.get(promptId);
    const disabled = mapData && mapData.length > 0;
    if (disabled) {
      this.snackbarService.info("Cannot delete prompt as it is associated with the following receipt processing settings: " + mapData.map((m) => m.name).join(", "));
    }

  }
}
