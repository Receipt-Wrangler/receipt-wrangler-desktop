import { ReceiptTableInterface } from 'src/interfaces';
import { GroupRolePipe } from 'src/pipes/group-role.pipe';

import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import {
  PagedRequestField,
  ReceiptPagedRequestFilter,
  Receipt,
  FilterOperation,
  ReceiptStatus,
} from '@receipt-wrangler/receipt-wrangler-core';

import {
  ResetReceiptFilter,
  SetPage,
  SetPageSize,
  SetReceiptFilter,
  SetReceiptFilterData,
} from './receipt-table.actions';
import { defaultReceiptFilter, ReceiptTableState } from './receipt-table.state';

describe('ReceiptTableState', () => {
  let store: Store;
  let filledFilter: ReceiptPagedRequestFilter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupRolePipe],
      imports: [NgxsModule.forRoot([ReceiptTableState])],
    }).compileComponents();

    filledFilter = {
      date: {
        operation: FilterOperation.EQUALS,
        value: '2023-01-06',
      },
      name: {
        operation: FilterOperation.EQUALS,
        value: 'hello world',
      },
      amount: {
        operation: FilterOperation.GREATERTHAN,
        value: 12.05,
      },
      paidBy: {
        operation: FilterOperation.CONTAINS,
        value: [1],
      },
      categories: {
        operation: FilterOperation.CONTAINS,
        value: [2],
      },
      tags: {
        operation: FilterOperation.CONTAINS,
        value: [3, 4],
      },
      status: {
        operation: FilterOperation.CONTAINS,
        value: [ReceiptStatus.OPEN],
      },
      resolvedDate: {
        operation: FilterOperation.GREATERTHAN,
        value: '2023-01-06',
      },
    } as any;

    store = TestBed.inject(Store);
  });

  it('should return page number', () => {
    const result = store.selectSnapshot(ReceiptTableState.page);

    expect(result).toEqual(1);
  });

  it('should return pageSize', () => {
    const result = store.selectSnapshot(ReceiptTableState.pageSize);

    expect(result).toEqual(50);
  });

  it('should return the full state', () => {
    const result = store.selectSnapshot(ReceiptTableState.filterData);

    expect(result).toEqual({
      page: 1,
      pageSize: 50,
      orderBy: 'date',
      sortDirection: 'desc',
      filter: defaultReceiptFilter,
    });
  });

  it('should return 0 since no filters are applied', () => {
    const result = store.selectSnapshot(ReceiptTableState.numFiltersApplied);

    expect(result).toEqual(0);
  });

  it('should return 8 since all filters are applied', () => {
    store.reset({
      receiptTable: {
        filter: filledFilter,
      },
    });
    const result = store.selectSnapshot(ReceiptTableState.numFiltersApplied);

    expect(result).toEqual(8);
  });

  it('should set page', () => {
    store.dispatch(new SetPage(40));

    const result = store.selectSnapshot(ReceiptTableState.page);
    expect(result).toEqual(40);
  });

  it('should set page size', () => {
    store.dispatch(new SetPageSize(100));

    const result = store.selectSnapshot(ReceiptTableState.pageSize);
    expect(result).toEqual(100);
  });

  it('should set filter data', () => {
    const filterData: ReceiptTableInterface = {
      page: 20,
      pageSize: 40,
      orderBy: 'amount',
      sortDirection: 'asc',
      filter: {} as any,
    };
    store.dispatch(new SetReceiptFilterData(filterData));

    const result = store.selectSnapshot(ReceiptTableState.filterData);
    expect(result).toEqual(filterData);
  });

  it('should set filter receipt filter', () => {
    store.dispatch(new SetReceiptFilter(filledFilter));

    const result = store.selectSnapshot(ReceiptTableState.filterData);
    expect(result.filter).toEqual(filledFilter);
  });

  it('should reset filter', () => {
    store.reset({
      receiptTable: {
        filter: filledFilter,
      },
    });

    expect(store.selectSnapshot(ReceiptTableState.filterData).filter).toEqual(
      filledFilter
    );

    store.dispatch(new ResetReceiptFilter());

    const result = store.selectSnapshot(ReceiptTableState.filterData).filter;
    expect(result).toEqual(defaultReceiptFilter);
  });
});
