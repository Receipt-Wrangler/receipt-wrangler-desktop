import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagFormComponent } from './tag-form.component';
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
  TagService,
  TagView,
} from '@receipt-wrangler/receipt-wrangler-core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ca } from 'date-fns/locale';
import { of } from 'rxjs';
import { DuplicateValidator } from 'src/validators/duplicate-validator';

describe('CategoryForm', () => {
  let component: TagFormComponent;
  let fixture: ComponentFixture<TagFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagFormComponent],
      imports: [
        ApiModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule,
        PipesModule,
        ReactiveFormsModule,
      ],
      providers: [
        DuplicateValidator,
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {},
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(TagFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form with data', () => {
    const tag: TagView = {
      id: 1,
      name: 'test',
      description: 'test',
      numberOfReceipts: 1,
    };
    component.tag = tag;

    component.ngOnInit();

    expect(component.form.value).toEqual({
      name: 'test',
      description: 'test',
    });
  });

  it('should submit form with correct data, when editing', () => {
    const tagServiceSpy = spyOn(TestBed.inject(TagService), 'updateTag');
    tagServiceSpy.and.returnValue(of({} as any));
    const nameValidateSpy = spyOn(
      TestBed.inject(TagService),
      'getTagCountByName'
    ).and.returnValue(of(0) as any);
    const tag: TagView = {
      id: 1,
      name: 'test',
      description: 'test',
      numberOfReceipts: 1,
    };
    component.tag = tag;

    component.ngOnInit();
    component.submit();

    expect(tagServiceSpy).toHaveBeenCalledOnceWith(
      {
        name: 'test',
        description: 'test',
      },
      1
    );
  });

  it('should submit form with correct data, when creating', () => {
    const nameValidateSpy = spyOn(
      TestBed.inject(TagService),
      'getTagCountByName'
    ).and.returnValue(of(0) as any);
    const tagServiceSpy = spyOn(TestBed.inject(TagService), 'createTag');
    tagServiceSpy.and.returnValue(of({} as any));

    component.ngOnInit();
    component.form.patchValue({
      name: 'test',
      description: 'test',
    });
    component.submit();

    expect(tagServiceSpy).toHaveBeenCalledOnceWith({
      name: 'test',
      description: 'test',
    });
  });
});
