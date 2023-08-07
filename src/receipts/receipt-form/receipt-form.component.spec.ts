import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import {
  ApiModule,
  PipesModule as CorePipesModule,
  GroupState,
  Receipt,
  ReceiptImageService,
  SnackbarService,
} from '@receipt-wrangler/receipt-wrangler-core';
import { of } from 'rxjs';
import { PipesModule } from 'src/pipes/pipes.module';
import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { ReceiptFormComponent } from './receipt-form.component';
import { FormMode } from 'src/enums/form-mode.enum';

describe('ReceiptFormComponent', () => {
  let component: ReceiptFormComponent;
  let fixture: ComponentFixture<ReceiptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceiptFormComponent],
      imports: [
        ApiModule,
        CorePipesModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule,
        NgxsModule.forRoot([GroupState]),
        PipesModule,
        ReactiveFormsModule,
        SharedUiModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: {} }, params: of({}) },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceiptFormComponent);
    component = fixture.componentInstance;
    component.mode = FormMode.edit;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form correctly when there is no initial data', () => {
    const mockedDate = new Date(2020, 0, 1);
    jasmine.clock().mockDate(mockedDate);
    component.ngOnInit();

    expect(component.form.value).toEqual({
      name: '',
      amount: '',
      categories: [],
      tags: [],
      date: mockedDate,
      paidByUserId: '',
      groupId: 0,
      status: Receipt.StatusEnum.OPEN,
    });
  });

  it('should patch magic fill values correctly', () => {
    component.images = [{ id: 1 } as any];
    component.ngOnInit();
    component.carouselComponent = {
      currentlyShownImageIndex: 0,
    } as any;
    component.categories = [
      { id: 1, name: 'category' } as any,
      { id: 2, name: 'category2' } as any,
    ];

    const magicReceipt = {
      name: 'magic',
      amount: '482.32',
      date: '2023-08-05T04:09:12.316Z',
      categories: [{ id: 1 } as any],
    } as any;

    const receiptImageServiceSpy = spyOn(
      TestBed.inject(ReceiptImageService),
      'magicFillReceipt'
    ).and.returnValue(of(magicReceipt));

    const snackbarSpy = spyOn(
      TestBed.inject(SnackbarService),
      'success'
    ).and.returnValue(undefined);

    component.magicFill();

    expect(receiptImageServiceSpy).toHaveBeenCalledWith(undefined, 1);

    const receiptValue = component.form.getRawValue();

    expect(receiptValue.name).toEqual(magicReceipt.name);
    expect(receiptValue.amount).toEqual(magicReceipt.amount);
    expect(receiptValue.date.length > 1).toEqual(true);
    expect(receiptValue.categories).toEqual([component.categories[0]]);
    expect(snackbarSpy).toHaveBeenCalledWith(
      'Magic fill successfully filled name, amount, date, categories from selected image!',
      { duration: 10000 }
    );
  });

  it('should not patch magic fill values if they are the defaults', () => {
    component.images = [{ id: 1 } as any];
    component.ngOnInit();
    component.carouselComponent = {
      currentlyShownImageIndex: 0,
    } as any;

    const originalData = {
      name: 'a different name',
      amount: '482.32',
      date: '2023-08-05T04:09:12.316Z',
    } as any;

    component.form.patchValue(originalData);

    const magicReceipt = {
      name: 'magic',
      amount: '0',
      date: '0001-01-01T00:00:00Z',
    } as any;

    const receiptImageServiceSpy = spyOn(
      TestBed.inject(ReceiptImageService),
      'magicFillReceipt'
    ).and.returnValue(of(magicReceipt));

    component.magicFill();

    expect(receiptImageServiceSpy).toHaveBeenCalledWith(undefined, 1);

    const receiptValue = component.form.getRawValue();

    expect(receiptValue.name).toEqual(magicReceipt.name);
    expect(receiptValue.amount).toEqual(originalData.amount);
    expect(receiptValue.date).toEqual(originalData.date);
  });

  it('should not patch any values when they are all default values and pop error snackbar', () => {
    component.images = [{ id: 1 } as any];
    component.ngOnInit();
    component.carouselComponent = {
      currentlyShownImageIndex: 0,
    } as any;

    const originalData = {
      name: 'a different name',
      amount: '482.32',
      date: '2023-08-05T04:09:12.316Z',
    } as any;

    component.form.patchValue(originalData);

    const magicReceipt = {
      name: '',
      amount: '0',
      date: '0001-01-01T00:00:00Z',
    } as any;

    const receiptImageServiceSpy = spyOn(
      TestBed.inject(ReceiptImageService),
      'magicFillReceipt'
    ).and.returnValue(of(magicReceipt));

    const snackbarSpy = spyOn(
      TestBed.inject(SnackbarService),
      'error'
    ).and.returnValue(undefined);

    component.magicFill();

    expect(receiptImageServiceSpy).toHaveBeenCalledWith(undefined, 1);

    const receiptValue = component.form.getRawValue();

    expect(receiptValue.name).toEqual(originalData.name);
    expect(receiptValue.amount).toEqual(originalData.amount);
    expect(receiptValue.date).toEqual(originalData.date);
    expect(snackbarSpy).toHaveBeenCalledWith(
      'Could not find any values to fill! Try reuploading a clearer image.'
    );
  });
});
