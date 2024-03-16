import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule, MatDialogRef, } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { of } from "rxjs";
import { DuplicateValidator } from "src/validators/duplicate-validator";
import { ApiModule, CategoryService, CategoryView } from "../../open-api";
import { PipesModule } from "../../pipes";
import { CategoryForm } from "./category-form.component";

describe("CategoryForm", () => {
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
    fixture = TestBed.createComponent(CategoryForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should init form with data", () => {
    const category: CategoryView = {
      id: 1,
      name: "test",
      description: "test",
      numberOfReceipts: 1,
    };
    component.category = category;

    component.ngOnInit();

    expect(component.form.value).toEqual({
      name: "test",
      description: "test",
    });
  });

  it("should submit form with correct data, when editing", () => {
    const categoryServiceSpy = spyOn(
      TestBed.inject(CategoryService),
      "updateCategory"
    );
    categoryServiceSpy.and.returnValue(of({} as any));
    const nameValidateSpy = spyOn(
      TestBed.inject(CategoryService),
      "getCategoryCountByName"
    ).and.returnValue(of(0) as any);
    const category: CategoryView = {
      id: 1,
      name: "test",
      description: "test",
      numberOfReceipts: 1,
    };
    component.category = category;

    component.ngOnInit();
    component.submit();

    expect(categoryServiceSpy).toHaveBeenCalledOnceWith(
      {
        id: 1,
        name: "test",
        description: "test",
      },
      1
    );
  });

  it("should submit form with correct data, when creating", () => {
    const nameValidateSpy = spyOn(
      TestBed.inject(CategoryService),
      "getCategoryCountByName"
    ).and.returnValue(of(0) as any);
    const categoryServiceSpy = spyOn(
      TestBed.inject(CategoryService),
      "createCategory"
    );
    categoryServiceSpy.and.returnValue(of({} as any));

    component.ngOnInit();
    component.form.patchValue({
      name: "test",
      description: "test",
    });
    component.submit();

    expect(categoryServiceSpy).toHaveBeenCalledOnceWith({
      name: "test",
      description: "test",
    });
  });
});
