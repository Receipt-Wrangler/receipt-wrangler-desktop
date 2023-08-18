import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesListComponent } from './categories-list.component';
import { CategoryTableState } from 'src/store/category-table.state';
import { NgxsModule } from '@ngxs/store';
import {
  ApiModule,
  CategoryService,
  CategoryView,
} from '@receipt-wrangler/receipt-wrangler-core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';

describe('CategoriesListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesListComponent],
      imports: [
        NgxsModule.forRoot([CategoryTableState]),
        ApiModule,
        HttpClientTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(CategoriesListComponent);
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should attempt to get table data, set datasource and total count', () => {
    const serviceSpy = spyOn(
      TestBed.inject(CategoryService),
      'getPagedCategories'
    );
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
    const serviceSpy = spyOn(
      TestBed.inject(CategoryService),
      'getPagedCategories'
    );
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

    expect(store.selectSnapshot(CategoryTableState.state)).toEqual({
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
    const serviceSpy = spyOn(
      TestBed.inject(CategoryService),
      'getPagedCategories'
    );
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

    expect(store.selectSnapshot(CategoryTableState.state)).toEqual({
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

    expect(component.columns.length).toEqual(2);
    expect(component.displayedColumns).toEqual(['name', 'numberOfReceipts']);
  });
});
