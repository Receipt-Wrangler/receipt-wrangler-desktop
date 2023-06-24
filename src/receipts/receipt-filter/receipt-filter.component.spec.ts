import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule, Store } from '@ngxs/store';
import { InputModule } from 'src/input/input.module';
import { PipesModule } from 'src/pipes/pipes.module';
import { ReceiptTableState } from 'src/store/receipt-table.state';
import { OperationsPipe } from './operations.pipe';
import { ReceiptFilterComponent } from './receipt-filter.component';
import { PagedRequestFilterOperation } from 'src/api/commands/paged-request-command';
import { ReceiptStatus } from 'src/enums/receipt-status.enum';
import { of } from 'rxjs';
import { SetReceiptFilter } from 'src/store/receipt-table.actions';

describe('ReceiptFilterComponent', () => {
  let component: ReceiptFilterComponent;
  let fixture: ComponentFixture<ReceiptFilterComponent>;
  let store: Store;
  const defaultFilter = {
    date: {
      operation: PagedRequestFilterOperation.EQUALS,
      value: '',
    },
    name: {
      operation: PagedRequestFilterOperation.EQUALS,
      value: '',
    },
    amount: {
      operation: PagedRequestFilterOperation.EQUALS,
      value: '',
    },
    paidBy: {
      operation: PagedRequestFilterOperation.CONTAINS,
      value: [],
    },
    categories: {
      operation: PagedRequestFilterOperation.CONTAINS,
      value: [],
    },
    tags: {
      operation: PagedRequestFilterOperation.CONTAINS,
      value: [],
    },
    status: {
      operation: PagedRequestFilterOperation.CONTAINS,
      value: [],
    },
    resolvedDate: {
      operation: PagedRequestFilterOperation.EQUALS,
      value: '',
    },
  };

  const filledFilter = {
    date: {
      operation: PagedRequestFilterOperation.EQUALS,
      value: '2023-01-06',
    },
    name: {
      operation: PagedRequestFilterOperation.EQUALS,
      value: 'hello world',
    },
    amount: {
      operation: PagedRequestFilterOperation.GREATER_THAN,
      value: 12.05,
    },
    paidBy: {
      operation: PagedRequestFilterOperation.CONTAINS,
      value: [1],
    },
    categories: {
      operation: PagedRequestFilterOperation.CONTAINS,
      value: [2],
    },
    tags: {
      operation: PagedRequestFilterOperation.CONTAINS,
      value: [3, 4],
    },
    status: {
      operation: PagedRequestFilterOperation.CONTAINS,
      value: [ReceiptStatus.OPEN],
    },
    resolvedDate: {
      operation: PagedRequestFilterOperation.GREATER_THAN,
      value: '2023-01-06',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiptFilterComponent, OperationsPipe],
      imports: [
        NgxsModule.forRoot([ReceiptTableState]),
        MatDialogModule,
        InputModule,
        ReactiveFormsModule,
        PipesModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: (value: any) => {},
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            categories: [],
            tags: [],
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(ReceiptFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form with no default initial data', () => {
    component.ngOnInit();

    expect(component.form.value).toEqual(defaultFilter);
  });

  it('should init form with initial data', () => {
    store.reset({
      receiptTable: {
        filter: filledFilter,
      },
    });
    component.ngOnInit();

    expect(component.form.value).toEqual(filledFilter);
  });

  it('should reset form', () => {
    store.reset({
      receiptTable: {
        filter: filledFilter,
      },
    });
    component.ngOnInit();

    expect(component.form.value).toEqual(filledFilter);

    component.resetFilter();
    expect(component.form.value).toEqual(defaultFilter);
  });

  it('should set form in state and close dialog', () => {
    const dialogRefSpy = spyOn(
      TestBed.inject(MatDialogRef<ReceiptFilterComponent>),
      'close'
    );
    const storeRefSpy = spyOn(store, 'dispatch').and.returnValue(of(undefined));

    component.submitButtonClicked();

    expect(storeRefSpy).toHaveBeenCalledWith(
      new SetReceiptFilter(component.form.value)
    );
    expect(dialogRefSpy).toHaveBeenCalledOnceWith(true);
  });

  it('should close dialog on cancel', () => {
    const dialogRefSpy = spyOn(
      TestBed.inject(MatDialogRef<ReceiptFilterComponent>),
      'close'
    );
    component.cancelButtonClicked();

    expect(dialogRefSpy).toHaveBeenCalledOnceWith(false);
  });
});
