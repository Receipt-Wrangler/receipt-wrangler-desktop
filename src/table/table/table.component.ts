import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from '../table-column.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  @ViewChild(MatSort) public sort!: MatSort;
  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  @Input() public columns: TableColumn[] = [];
  @Input() public displayedColumns: string[] = [];
  @Input() public dataSource = new MatTableDataSource<any>([]);
  @Input() public pagination: boolean = false;
  @Input() public selectionCheckboxes: boolean = false;
  @Input() public page: number = 0;
  @Input() public pageSize: number = 50;
  @Input() public length: number = 0;

  @Output() public sorted: EventEmitter<Sort> = new EventEmitter<Sort>();
  @Output() public pageChange: EventEmitter<PageEvent> =
    new EventEmitter<PageEvent>();

  public defaultSort?: Sort;
  public selection = new SelectionModel<any>(true, []);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
      const column = this.columns.find((c) => c.defaultSortDirection);
      if (column) {
        this.defaultSort = {
          active: column.matColumnDef,
          direction: column.defaultSortDirection ?? 'desc',
        };
        this.sort.sort({
          id: column.matColumnDef,
          start: column.defaultSortDirection as any,
          disableClear: true,
        });
      } else {
        this.defaultSort = {
          active: '',
          direction: '',
        };
      }
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }

    this.sorted.emit(sortState);
  }

  public pageChanged(pageEvent: PageEvent): void {
    this.pageChange.emit(pageEvent);
  }
}
