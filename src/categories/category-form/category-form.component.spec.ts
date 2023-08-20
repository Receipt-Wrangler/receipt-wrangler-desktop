import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryForm } from './category-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  ApiModule,
  Category,
  CategoryService,
  CategoryView,
  PipesModule,
} from '@receipt-wrangler/receipt-wrangler-core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ca } from 'date-fns/locale';
import { of } from 'rxjs';

describe('CategoryForm', () => {
  let component: CategoryForm;
  let fixture: ComponentFixture<CategoryForm>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryForm],
      imports: [
        ApiModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule,
        PipesModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {},
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(CategoryForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form with data', () => {
    const category: CategoryView = {
      id: 1,
      name: 'test',
      description: 'test',
      numberOfReceipts: 1,
    };
    component.category = category;

    component.ngOnInit();

    expect(component.form.value).toEqual({
      name: 'test',
      description: 'test',
    });
  });

  it('should submit form with correct data', () => {
    const categoryServiceSpy = spyOn(
      TestBed.inject(CategoryService),
      'updateCategory'
    );
    categoryServiceSpy.and.returnValue(of({} as any));
    const category: CategoryView = {
      id: 1,
      name: 'test',
      description: 'test',
      numberOfReceipts: 1,
    };
    component.category = category;

    component.ngOnInit();
    component.submit();

    expect(categoryServiceSpy).toHaveBeenCalledOnceWith(
      {
        id: 1,
        name: 'test',
        description: 'test',
      },
      1
    );
  });
});
