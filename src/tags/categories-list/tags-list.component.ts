import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import {
  PagedRequestCommand,
  SnackbarService,
  TagService,
  TagView,
} from '@receipt-wrangler/receipt-wrangler-core';
import { of, switchMap, take, tap } from 'rxjs';
import {
  SetOrderBy,
  SetPage,
  SetPageSize,
  SetSortDirection,
} from 'src/store/paged-table.state.actions';
import { TagTableState } from 'src/store/tag-table.state';
import { TableColumn } from 'src/table/table-column.interface';
import { TableComponent } from 'src/table/table/table.component';
import { TagFormComponent } from '../tag-form/tag-form.component';
import { DEFAULT_DIALOG_CONFIG } from 'src/constants';
import { ConfirmationDialogComponent } from 'src/shared-ui/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss'],
})
export class TagsListComponent implements OnInit, AfterViewInit {
  @ViewChild('nameCell') public nameCell!: TemplateRef<any>;

  @ViewChild('descriptionCell')
  public descriptionCell!: TemplateRef<any>;

  @ViewChild('numberOfReceiptsCell')
  public numberOfReceiptsCell!: TemplateRef<any>;

  @ViewChild('actionsCell')
  public actionsCell!: TemplateRef<any>;

  @ViewChild(TableComponent) public table!: TableComponent;

  constructor(
    private matDialog: MatDialog,
    private snackbarService: SnackbarService,
    private store: Store,
    private tagService: TagService
  ) {}

  public dataSource: MatTableDataSource<TagView> =
    new MatTableDataSource<TagView>([]);

  public displayedColumns: string[] = [];

  public columns: TableColumn[] = [];

  public totalCount: number = 0;

  public headerText: string = 'Tags';

  public ngOnInit(): void {
    this.initTableData();
  }

  public ngAfterViewInit(): void {
    this.initTable();
  }

  private initTableData(): void {
    this.getTags();
  }

  private getTags(): void {
    const command: PagedRequestCommand = this.store.selectSnapshot(
      TagTableState.state
    );

    this.tagService
      .getPagedTags(command)
      .pipe(
        take(1),
        tap((pagedData) => {
          this.dataSource = new MatTableDataSource<TagView>(pagedData.data);
          this.totalCount = pagedData.totalCount;
        })
      )
      .subscribe();
  }

  public updatePageData(pageEvent: PageEvent) {
    const newPage = pageEvent.pageIndex + 1;

    this.store.dispatch(new SetPage(newPage));
    this.store.dispatch(new SetPageSize(pageEvent.pageSize));

    this.getTags();
  }

  public sorted(sortState: Sort): void {
    this.store.dispatch(new SetOrderBy(sortState.active));
    this.store.dispatch(new SetSortDirection(sortState.direction));

    this.getTags();
  }

  private initTable(): void {
    this.setColumns();
  }

  private setColumns(): void {
    this.columns = [
      {
        columnHeader: 'Name',
        matColumnDef: 'name',
        template: this.nameCell,
        sortable: true,
      },
      {
        columnHeader: 'Number of Receipts with Tags',
        matColumnDef: 'numberOfReceipts',
        template: this.numberOfReceiptsCell,
        sortable: true,
      },
      {
        columnHeader: 'Description',
        matColumnDef: 'description',
        template: this.descriptionCell,
        sortable: true,
      },
      {
        columnHeader: 'Actions',
        matColumnDef: 'actions',
        template: this.actionsCell,
        sortable: false,
      },
    ];

    this.displayedColumns = [
      'name',
      'description',
      'numberOfReceipts',
      'actions',
    ];
  }

  public openEditDialog(tagView: TagView): void {
    const dialogRef = this.matDialog.open(
      TagFormComponent,
      DEFAULT_DIALOG_CONFIG
    );

    dialogRef.componentInstance.tag = tagView;
    dialogRef.componentInstance.headerText = `Edit ${tagView.name}`;

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        tap((refreshData) => {
          if (refreshData) {
            this.getTags();
          }
        })
      )
      .subscribe();
  }

  public openAddDialog(): void {
    const dialogRef = this.matDialog.open(
      TagFormComponent,
      DEFAULT_DIALOG_CONFIG
    );

    dialogRef.componentInstance.headerText = `Add tag`;

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        tap((refreshData) => {
          if (refreshData) {
            this.getTags();
          }
        })
      )
      .subscribe();
  }

  public openDeleteConfirmationDialog(tagView: TagView) {
    const dialogRef = this.matDialog.open(
      ConfirmationDialogComponent,
      DEFAULT_DIALOG_CONFIG
    );
    dialogRef.componentInstance.headerText = `Delete ${tagView.name}`;
    dialogRef.componentInstance.dialogContent = `Are you sure you want to delete ${tagView.name}? This action is irreversiable and will remove this tag from the receipts it is associated with.`;
    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        switchMap((confirmed) => {
          if (confirmed) {
            return this.tagService.deleteTag(tagView.id).pipe(
              tap(() => {
                this.snackbarService.success('Tag successfully deleted');
                this.getTags();
              })
            );
          } else {
            return of(undefined);
          }
        })
      )
      .subscribe();
  }
}
