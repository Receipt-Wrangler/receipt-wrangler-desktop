import { take, tap } from "rxjs";
import { CategoryTableState } from "src/store/category-table.state";
import { TableColumn } from "src/table/table-column.interface";
import { TableComponent } from "src/table/table/table.component";

import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Store } from "@ngxs/store";
import {
  Category, CategoryService, PagedRequestCommand
} from "@receipt-wrangler/receipt-wrangler-core";

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit, AfterViewInit {
  @ViewChild('nameCell') public nameCell!: TemplateRef<any>;

  @ViewChild(TableComponent) public table!: TableComponent;

  constructor(private store: Store, private categoryService: CategoryService) {}

  public dataSource: MatTableDataSource<Category> =
    new MatTableDataSource<Category>([]);

  public displayedColumns: string[] = [];

  public columns: TableColumn[] = [];

  public totalCount: number = 0;

  public headerText: string = 'Categories';

  public ngOnInit(): void {
    this.initTableData();
  }

  private initTableData(): void {
    this.getCategories();
  }

  private getCategories(): void {
    const command: PagedRequestCommand = this.store.selectSnapshot(
      CategoryTableState.state
    );

    this.categoryService
      .getPagedCategories(command)
      .pipe(
        take(1),
        tap((pagedData) => {
          console.warn(pagedData);
          this.dataSource = new MatTableDataSource<Category>(pagedData.data);
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
    this.setDataSource();
  }

  private setColumns(): void {
    this.columns = [
      {
        columnHeader: 'Name',
        matColumnDef: 'name',
        template: this.nameCell,
        sortable: true,
      },
    ];

    this.displayedColumns = [
      'name',
      //'actions',
    ];
  }

  private setDataSource(): void {}
}
