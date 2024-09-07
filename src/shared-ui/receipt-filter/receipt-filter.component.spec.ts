import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, } from "@angular/material/dialog";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { UntilDestroy } from "@ngneat/until-destroy";
import { NgxsModule, Store } from "@ngxs/store";
import { of, tap } from "rxjs";
import { PipesModule } from "src/pipes/pipes.module";
import { SetReceiptFilter } from "src/store/receipt-table.actions";
import { defaultReceiptFilter, ReceiptTableState, } from "src/store/receipt-table.state";
import { InputModule } from "../../input";
import { CategoryService, FilterOperation, ReceiptStatus, TagService } from "../../open-api";
import { applyFormCommand } from "../../utils/index";
import { buildReceiptFilterForm } from "../../utils/receipt-filter";
import { OperationsPipe } from "./operations.pipe";
import { ReceiptFilterComponent } from "./receipt-filter.component";

@UntilDestroy()
@Component({
  selector: "app-noop",
  template: "",
})
class NoopComponent {}

describe("ReceiptFilterComponent", () => {
  let component: ReceiptFilterComponent;
  let fixture: ComponentFixture<ReceiptFilterComponent>;
  let store: Store;

  const filledFilter = {
    date: {
      operation: FilterOperation.Equals,
      value: "2023-01-06",
    },
    name: {
      operation: FilterOperation.Equals,
      value: "hello world",
    },
    amount: {
      operation: FilterOperation.GreaterThan,
      value: 12.05,
    },
    paidBy: {
      operation: FilterOperation.Contains,
      value: [1],
    },
    categories: {
      operation: FilterOperation.Contains,
      value: [2],
    },
    tags: {
      operation: FilterOperation.Contains,
      value: [3, 4],
    },
    status: {
      operation: FilterOperation.Contains,
      value: [ReceiptStatus.Open],
    },
    resolvedDate: {
      operation: FilterOperation.GreaterThan,
      value: "2023-01-06",
    },
    createdAt: {
      operation: FilterOperation.GreaterThan,
      value: "2023-01-06",
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiptFilterComponent, OperationsPipe],
      imports: [
        PipesModule,
        HttpClientTestingModule,
        InputModule,
        MatDialogModule,
        NgxsModule.forRoot([ReceiptTableState]),
        NoopAnimationsModule,
        PipesModule,
        ReactiveFormsModule,
      ],
      providers: [
        CategoryService,
        TagService,
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

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should init form with no default initial data", () => {
    spyOn(TestBed.inject(CategoryService), "getAllCategories").and.returnValue(
      of([]) as any
    );
    spyOn(TestBed.inject(TagService), "getAllTags").and.returnValue(
      of([]) as any
    );

    const noopComponent = TestBed.createComponent(NoopComponent).componentInstance;

    component.parentForm = buildReceiptFilterForm({}, noopComponent);
    component.ngOnInit();

    expect(component.parentForm.value).toEqual(defaultReceiptFilter);
  });

  it("should init form with initial data", () => {
    spyOn(TestBed.inject(CategoryService), "getAllCategories").and.returnValue(
      of([]) as any
    );
    spyOn(TestBed.inject(TagService), "getAllTags").and.returnValue(
      of([]) as any
    );
    store.reset({
      receiptTable: {
        filter: filledFilter,
      },
    });

    const noopComponent = TestBed.createComponent(NoopComponent).componentInstance;

    component.parentForm = buildReceiptFilterForm(filledFilter, noopComponent);
    component.ngOnInit();

    expect(component.parentForm.value).toEqual(filledFilter);
  });

  it("should reset form", () => {
    spyOn(TestBed.inject(CategoryService), "getAllCategories").and.returnValue(
      of([]) as any
    );
    spyOn(TestBed.inject(TagService), "getAllTags").and.returnValue(
      of([]) as any
    );
    store.reset({
      receiptTable: {
        filter: filledFilter,
      },
    });

    component.formCommand.pipe(tap((formCommand) => {
      applyFormCommand(component.parentForm, formCommand);
    })).subscribe();

    const noopComponent = TestBed.createComponent(NoopComponent).componentInstance;

    component.parentForm = buildReceiptFilterForm(filledFilter, noopComponent);
    component.ngOnInit();

    expect(component.parentForm.value).toEqual(filledFilter);

    component.resetFilter();
    expect(component.parentForm.value).toEqual(defaultReceiptFilter);
  });

  it("should set form in state and close dialog", () => {
    const dialogRefSpy = spyOn(
      TestBed.inject(MatDialogRef<ReceiptFilterComponent>),
      "close"
    );
    const storeRefSpy = spyOn(store, "dispatch").and.returnValue(of(undefined));

    component.submitButtonClicked();

    expect(storeRefSpy).toHaveBeenCalledWith(
      new SetReceiptFilter(component.parentForm.value)
    );
    expect(dialogRefSpy).toHaveBeenCalledOnceWith(true);
  });

  it("should close dialog on cancel", () => {
    const dialogRefSpy = spyOn(
      TestBed.inject(MatDialogRef<ReceiptFilterComponent>),
      "close"
    );
    component.cancelButtonClicked();

    expect(dialogRefSpy).toHaveBeenCalledOnceWith(false);
  });
});
