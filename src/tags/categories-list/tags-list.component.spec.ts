import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxsModule, Store } from '@ngxs/store';
import { ApiModule, TagService } from '@receipt-wrangler/receipt-wrangler-core';
import { of } from 'rxjs';
import { TagsTableState } from 'src/store/tags-table.state';
import { TagsListComponent } from './tags-list.component';
// import { CategoryForm } from '../category-form/category-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('TagsListComponent', () => {
  let component: TagsListComponent;
  let fixture: ComponentFixture<TagsListComponent>;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagsListComponent],
      imports: [
        ApiModule,
        HttpClientTestingModule,
        MatDialogModule,
        NgxsModule.forRoot([TagsTableState]),
        MatSnackBarModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(TagsListComponent);
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should attempt to get table data, set datasource and total count', () => {
    const serviceSpy = spyOn(TestBed.inject(TagService), 'getPagedTags');
    serviceSpy.and.returnValue(
      of({
        data: [{}],
        totalCount: 1,
      } as any)
    );

    component.ngOnInit();

    expect(serviceSpy).toHaveBeenCalledOnceWith({
      page: 1,
      pageSize: 50,
      orderBy: 'name',
      sortDirection: 'desc',
    });

    expect(component.totalCount).toEqual(1);
    expect(component.dataSource.data).toEqual([{} as any]);
  });

  it('should attempt to get table data, with new sorted direction and key', () => {
    const serviceSpy = spyOn(TestBed.inject(TagService), 'getPagedTags');
    serviceSpy.and.returnValue(
      of({
        data: [{}],
        totalCount: 1,
      } as any)
    );

    component.sorted({
      active: 'numberOfReceipts',
      direction: 'asc',
    });

    expect(store.selectSnapshot(TagsTableState.state)).toEqual({
      page: 1,
      pageSize: 50,
      orderBy: 'numberOfReceipts',
      sortDirection: 'asc',
    });
    expect(serviceSpy).toHaveBeenCalledOnceWith({
      page: 1,
      pageSize: 50,
      orderBy: 'numberOfReceipts',
      sortDirection: 'asc',
    });
  });

  it('should attempt to get table data, with newpage and new page size', () => {
    const serviceSpy = spyOn(TestBed.inject(TagService), 'getPagedTags');
    serviceSpy.and.returnValue(
      of({
        data: [{}],
        totalCount: 1,
      } as any)
    );

    component.updatePageData({
      pageIndex: 2,
      pageSize: 100,
    } as any);

    expect(store.selectSnapshot(TagsTableState.state)).toEqual({
      page: 3,
      pageSize: 100,
      orderBy: 'name',
      sortDirection: 'desc',
    });
    expect(serviceSpy).toHaveBeenCalledOnceWith({
      page: 3,
      pageSize: 100,
      orderBy: 'name',
      sortDirection: 'desc',
    });
  });

  it('should set columns', () => {
    component.ngAfterViewInit();

    expect(component.columns.length).toEqual(4);
    expect(component.displayedColumns).toEqual([
      'name',
      'description',
      'numberOfReceipts',
      'actions',
    ]);
  });

  // it('should open edit dialog and refresh data when after closed with true', () => {
  //   const dialogSpy = spyOn(TestBed.inject(MatDialog), 'open');
  //   const serviceSpy = spyOn(
  //     TestBed.inject(TagService),
  //     'getPagedTags'
  //   );
  //   dialogSpy.and.returnValue({
  //     componentInstance: {
  //       category: {},
  //       headerText: '',
  //     },
  //     afterClosed: () => of(true),
  //   } as any);

  //   const categoryView: any = {};
  //   component.openEditDialog(categoryView);

  //   expect(dialogSpy).toHaveBeenCalledOnceWith(
  //     CategoryForm,
  //     DEFAULT_DIALOG_CONFIG
  //   );
  //   expect(serviceSpy).toHaveBeenCalledTimes(1);
  // });

  // it('should open edit dialog and not refresh data when after closed with false', () => {
  //   const dialogSpy = spyOn(TestBed.inject(MatDialog), 'open');
  //   const serviceSpy = spyOn(
  //     TestBed.inject(TagService),
  //     'getPagedTags'
  //   );
  //   dialogSpy.and.returnValue({
  //     componentInstance: {
  //       category: {},
  //       headerText: '',
  //     },
  //     afterClosed: () => of(false),
  //   } as any);

  //   const categoryView: any = {};
  //   component.openEditDialog(categoryView);

  //   expect(dialogSpy).toHaveBeenCalledOnceWith(
  //     CategoryForm,
  //     DEFAULT_DIALOG_CONFIG
  //   );
  //   expect(serviceSpy).toHaveBeenCalledTimes(0);
  // });

  // it('should open confirmation dialog and refresh data when after closed with true', () => {
  //   const dialogSpy = spyOn(TestBed.inject(MatDialog), 'open');
  //   const deleteSpy = spyOn(TestBed.inject(TagService), 'deleteCategory');
  //   deleteSpy.and.returnValue(of(undefined as any));
  //   const serviceSpy = spyOn(
  //     TestBed.inject(TagService),
  //     'getPagedTags'
  //   );
  //   dialogSpy.and.returnValue({
  //     componentInstance: {
  //       category: {},
  //       headerText: '',
  //     },
  //     afterClosed: () => of(true),
  //   } as any);

  //   const categoryView: any = { id: 1 };
  //   component.openDeleteConfirmationDialog(categoryView);

  //   expect(dialogSpy).toHaveBeenCalledOnceWith(
  //     ConfirmationDialogComponent,
  //     DEFAULT_DIALOG_CONFIG
  //   );
  //   expect(deleteSpy).toHaveBeenCalledWith(1);
  // });

  // it('should open confirmation dialog and not refresh data when after closed with false', () => {
  //   const dialogSpy = spyOn(TestBed.inject(MatDialog), 'open');
  //   const serviceSpy = spyOn(
  //     TestBed.inject(TagService),
  //     'getPagedTags'
  //   );
  //   dialogSpy.and.returnValue({
  //     componentInstance: {
  //       category: {},
  //       headerText: '',
  //     },
  //     afterClosed: () => of(false),
  //   } as any);

  //   const categoryView: any = {};
  //   component.openDeleteConfirmationDialog(categoryView);

  //   expect(dialogSpy).toHaveBeenCalledOnceWith(
  //     ConfirmationDialogComponent,
  //     DEFAULT_DIALOG_CONFIG
  //   );
  //   expect(serviceSpy).toHaveBeenCalledTimes(0);
  // });

  // it('should open add dialog and refresh data when after closed with true', () => {
  //   const dialogSpy = spyOn(TestBed.inject(MatDialog), 'open');
  //   const serviceSpy = spyOn(
  //     TestBed.inject(TagService),
  //     'getPagedTags'
  //   );
  //   dialogSpy.and.returnValue({
  //     componentInstance: {
  //       category: {},
  //       headerText: '',
  //     },
  //     afterClosed: () => of(true),
  //   } as any);

  //   component.openAddDialog();

  //   expect(dialogSpy).toHaveBeenCalledOnceWith(
  //     CategoryForm,
  //     DEFAULT_DIALOG_CONFIG
  //   );
  //   expect(serviceSpy).toHaveBeenCalledTimes(1);
  // });

  // it('should open add dialog and not refresh data when after closed with false', () => {
  //   const dialogSpy = spyOn(TestBed.inject(MatDialog), 'open');
  //   const serviceSpy = spyOn(
  //     TestBed.inject(TagService),
  //     'getPagedTags'
  //   );
  //   dialogSpy.and.returnValue({
  //     componentInstance: {
  //       category: {},
  //       headerText: '',
  //     },
  //     afterClosed: () => of(false),
  //   } as any);

  //   component.openAddDialog();

  //   expect(dialogSpy).toHaveBeenCalledOnceWith(
  //     CategoryForm,
  //     DEFAULT_DIALOG_CONFIG
  //   );
  //   expect(serviceSpy).toHaveBeenCalledTimes(0);
  // });
});