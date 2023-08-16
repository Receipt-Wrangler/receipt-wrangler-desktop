import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TableColumn } from 'src/table/table-column.interface';
import { TableComponent } from 'src/table/table/table.component';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements AfterViewInit {
  @ViewChild('usernameCell') public nameCell!: TemplateRef<any>;

  @ViewChild(TableComponent) public table!: TableComponent;

  public displayedColumns: string[] = [];

  public columns: TableColumn[] = [];

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
