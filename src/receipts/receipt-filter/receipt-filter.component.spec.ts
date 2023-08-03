import { InputModule } from '@receipt-wrangler/receipt-wrangler-core';
import { of } from 'rxjs';
import { PipesModule } from 'src/pipes/pipes.module';
import { SetReceiptFilter } from 'src/store/receipt-table.actions';
import {
  defaultReceiptFilter,
  ReceiptTableState,
} from 'src/store/receipt-table.state';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule, Store } from '@ngxs/store';
import {
  PipesModule as CorePipesModule,
  PagedRequestField,
  Receipt,
} from '@receipt-wrangler/receipt-wrangler-core';
import { OperationsPipe } from './operations.pipe';
import { ReceiptFilterComponent } from './receipt-filter.component';

describe('ReceiptFilterComponent', () => {
  let component: ReceiptFilterComponent;
  let fixture: ComponentFixture<ReceiptFilterComponent>;
  let store: Store;

  const filledFilter = {
    date: {
      operation: PagedRequestField.OperationEnum.EQUALS,
      value: '2023-01-06',
    },
    name: {
      operation: PagedRequestField.OperationEnum.EQUALS,
      value: 'hello world',
    },
    amount: {
      operation: PagedRequestField.OperationEnum.GREATERTHAN,
      value: 12.05,
    },
    paidBy: {
      operation: PagedRequestField.OperationEnum.CONTAINS,
      value: [1],
    },
    categories: {
      operation: PagedRequestField.OperationEnum.CONTAINS,
      value: [2],
    },
    tags: {
      operation: PagedRequestField.OperationEnum.CONTAINS,
      value: [3, 4],
    },
    status: {
      operation: PagedRequestField.OperationEnum.CONTAINS,
      value: [Receipt.StatusEnum.OPEN],
    },
    resolvedDate: {
      operation: PagedRequestField.OperationEnum.GREATERTHAN,
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
        CorePipesModule,
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

    expect(component.form.value).toEqual(defaultReceiptFilter);
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
    expect(component.form.value).toEqual(defaultReceiptFilter);
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
