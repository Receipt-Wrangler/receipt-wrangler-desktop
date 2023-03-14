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

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  @Input() public columns: TableColumn[] = [];
  @Input() public displayedColumns: string[] = [];
  @Input() public dataSource = new MatTableDataSource<any>([]);

  @Output() public sorted: EventEmitter<Sort> = new EventEmitter<Sort>();

  public defaultSort?: Sort;

  @ViewChild(MatSort) public sort!: MatSort;
  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
      const column = this.columns.find((c) => c.defaultSortDirection);
      if (column) {
        this.defaultSort = {
          active: column.matColumnDef,
          direction: column.defaultSortDirection ?? 'desc',
        };
      } else {
        this.defaultSort = {
          active: '',
          direction: '',
        };
      }
    }
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
}
