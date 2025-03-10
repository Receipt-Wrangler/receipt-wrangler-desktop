import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Select, Store } from "@ngxs/store";
import { Observable, take, tap } from "rxjs";
import { PagedTableInterface } from "src/interfaces/paged-table.interface";
import { CustomFieldService, PagedDataDataInner, PagedRequestCommand } from "src/open-api";
import { CategoryTableState } from "src/store/category-table.state";
import { TableComponent } from "src/table/table/table.component";
import { DEFAULT_DIALOG_CONFIG } from "../../constants/index";
import { SnackbarService } from "../../services/index";
import { CustomFieldTableState } from "../../store/custom-field-table.state";
import { SetOrderBy, SetPage, SetPageSize, SetSortDirection } from "../../store/custom-field-table.state.actions";
import { TableColumn } from "../../table/table-column.interface";
import { CustomFieldFormComponent } from "../custom-field-form/custom-field-form.component";

@Component({
  selector: "app-custom-field-table",
  templateUrl: "./custom-field-table.component.html",
  styleUrl: "./custom-field-table.component.scss",
  standalone: false
})
export class CustomFieldTableComponent implements OnInit, AfterViewInit {
  @ViewChild("nameCell") public nameCell!: TemplateRef<any>;

  @ViewChild("typeCell") public typeCell!: TemplateRef<any>;

  @ViewChild("descriptionCell") public descriptionCell!: TemplateRef<any>;

  @ViewChild("actionsCell")
  public actionsCell!: TemplateRef<any>;

  @ViewChild(TableComponent) public table!: TableComponent;

  @Select(CategoryTableState.state) public state!: Observable<PagedTableInterface>;
  // @ts-ignore
  public dataSource: MatTableDataSource<PagedDataDataInner> =
    new MatTableDataSource<PagedDataDataInner>([]);

  public displayedColumns: string[] = [];

  public columns: TableColumn[] = [];

  public totalCount: number = 0;

  constructor(
    private customFieldService: CustomFieldService,
    private matDialog: MatDialog,
    private snackbarService: SnackbarService,
    private store: Store,
  ) {}

  public ngOnInit(): void {
    this.initTableData();
  }

  public ngAfterViewInit(): void {
    this.initTable();
  }

  private initTableData(): void {
    this.getCustomFields();
  }

  private getCustomFields(): void {
    const command: PagedRequestCommand = this.store.selectSnapshot(
      CustomFieldTableState.state
    );

    this.customFieldService
      .getPagedCustomFields(command)
      .pipe(
        take(1),
        tap((pagedData) => {
          this.dataSource = new MatTableDataSource<PagedDataDataInner>(
            pagedData.data
          );
          this.totalCount = pagedData.totalCount;
        })
      )
      .subscribe();
  }

  public updatePageData(pageEvent: PageEvent) {
    const newPage = pageEvent.pageIndex + 1;

    this.store.dispatch(new SetPage(newPage));
    this.store.dispatch(new SetPageSize(pageEvent.pageSize));

    this.getCustomFields();
  }

  public sorted({ sortState }: { sortState: Sort }): void {
    this.store.dispatch(new SetOrderBy(sortState.active));
    this.store.dispatch(new SetSortDirection(sortState.direction));

    this.getCustomFields();
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
        sortable: true,
      },
      {
        columnHeader: "Type",
        matColumnDef: "type",
        template: this.typeCell,
        sortable: true,
      },
      {
        columnHeader: "Description",
        matColumnDef: "description",
        template: this.descriptionCell,
        sortable: true,
      }
    ] as TableColumn[];

    const tableState = this.store.selectSnapshot(CustomFieldTableState.state);
    if (tableState.orderBy) {
      const column = columns.find(c => c.matColumnDef === tableState.orderBy);
      if (column) {
        column.defaultSortDirection = tableState.sortDirection;
      }
    }

    this.columns = columns;
    this.displayedColumns = [
      "name",
      "type",
      "description"
    ];
  }


  public openAddDialog(): void {
    const dialogRef = this.matDialog.open(CustomFieldFormComponent, DEFAULT_DIALOG_CONFIG);

    //dialogRef.componentInstance.headerText = `Add Custom Field`;

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        tap((refreshData) => {
          if (refreshData) {
            // this.getCategories();
          }
        })
      )
      .subscribe();
  }

  /*  public openEditDialog(categoryView: CategoryView): void {
      const dialogRef = this.matDialog.open(CategoryForm, DEFAULT_DIALOG_CONFIG);

      dialogRef.componentInstance.category = categoryView;
      dialogRef.componentInstance.headerText = `Edit ${categoryView.name}`;

      dialogRef
        .afterClosed()
        .pipe(
          take(1),
          tap((refreshData) => {
            if (refreshData) {
              this.getCategories();
            }
          })
        )
        .subscribe();
    }

    public openAddDialog(): void {
      const dialogRef = this.matDialog.open(CategoryForm, DEFAULT_DIALOG_CONFIG);

      dialogRef.componentInstance.headerText = `Add category`;

      dialogRef
        .afterClosed()
        .pipe(
          take(1),
          tap((refreshData) => {
            if (refreshData) {
              this.getCategories();
            }
          })
        )
        .subscribe();
    }*/

  /*  public openDeleteConfirmationDialog(categoryView: CategoryView) {
      const dialogRef = this.matDialog.open(
        ConfirmationDialogComponent,
        DEFAULT_DIALOG_CONFIG
      );

      dialogRef.componentInstance.headerText = `Delete ${categoryView.name}`;
      dialogRef.componentInstance.dialogContent = `Are you sure you want to delete ${categoryView.name}? This action is irreversiable and will remove this category from the receipts it is associated with.`;

      dialogRef
        .afterClosed()
        .pipe(
          take(1),
          switchMap((confirmed) => {
            if (confirmed) {
              return this.categoryService.deleteCategory(categoryView.id).pipe(
                tap(() => {
                  this.snackbarService.success("Category successfully deleted");
                  this.getCategories();
                })
              );
            } else {
              return of(undefined);
            }
          })
        )
        .subscribe();
    }*/
}
