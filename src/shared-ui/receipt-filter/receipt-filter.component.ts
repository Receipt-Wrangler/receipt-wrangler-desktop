import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormGroup, } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngxs/store";
import { forkJoin, take, tap } from "rxjs";
import { RECEIPT_STATUS_OPTIONS } from "src/constants";
import { SetReceiptFilter } from "src/store/receipt-table.actions";
import { defaultReceiptFilter, ReceiptTableState, } from "src/store/receipt-table.state";
import { Category, CategoryService, ReceiptPagedRequestFilter, Tag, TagService } from "../../open-api";

@Component({
  selector: "app-receipt-filter",
  templateUrl: "./receipt-filter.component.html",
  styleUrls: ["./receipt-filter.component.scss"],
})
export class ReceiptFilterComponent implements OnInit {
  @Input() public headerText: string = "";

  @Input() public footerTemplate?: TemplateRef<any>;

  @Input() public filter?: ReceiptPagedRequestFilter;

  @Input() public isOpen: boolean = true;

  @Input() public previewTemplate?: TemplateRef<any>;

  @Input() public previewTemplateContext?: any;

  @Input() public inDialog: boolean = true;

  @Output() public formInitialized: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();

  public form: FormGroup = new FormGroup({});

  public receiptStatusOptions = RECEIPT_STATUS_OPTIONS;

  public categories: Category[] = [];

  public tags: Tag[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private dialogRef: MatDialogRef<ReceiptFilterComponent>,
    private categoryService: CategoryService,
    private tagService: TagService
  ) {}

  public ngOnInit(): void {
    forkJoin([
      this.categoryService.getAllCategories(),
      this.tagService.getAllTags(),
    ])
      .pipe(
        take(1),
        tap(([categories, tags]) => {
          this.categories = categories;
          this.tags = tags;

          this.initForm();
        })
      )
      .subscribe();
  }

  private initForm(): void {
    const filter =
      this.filter ??
      this.store.selectSnapshot(ReceiptTableState.filterData).filter as any;

    this.form = this.formBuilder.group({
      date: this.buildFieldFormGroup(
        filter?.date?.value,
        filter?.date?.operation
      ),
      amount: this.buildFieldFormGroup(
        filter?.amount?.value,
        filter?.amount?.operation
      ),
      name: this.buildFieldFormGroup(
        filter?.name?.value,
        filter?.name?.operation
      ),
      paidBy: this.buildFieldFormGroup(
        filter?.paidBy?.value ?? [],
        filter?.paidBy?.operation,
        true
      ),
      categories: this.buildFieldFormGroup(
        filter?.categories?.value ?? [],
        filter?.categories?.operation,
        true
      ),
      tags: this.buildFieldFormGroup(
        filter?.tags?.value ?? [],
        filter?.tags?.operation,
        true
      ),
      status: this.buildFieldFormGroup(
        filter?.status?.value ?? [],
        filter?.status?.operation,
        true
      ),
      resolvedDate: this.buildFieldFormGroup(
        filter?.resolvedDate?.value,
        filter?.resolvedDate?.operation
      ),
      createdAt: this.buildFieldFormGroup(
        filter?.createdAt?.value,
        filter?.createdAt?.operation
      ),
    });
    this.formInitialized.emit(this.form);
  }

  private buildFieldFormGroup(
    value: string | string[] | number | any,
    operation: string | undefined,
    isArray?: boolean
  ): FormGroup {
    let control: AbstractControl;
    if (isArray) {
      control = this.formBuilder.array(value as any) as FormArray;
    } else {
      control = this.formBuilder.control(value);
    }

    return this.formBuilder.group({
      operation: operation ?? "",
      value: control,
    });
  }

  public resetFilter(): void {
    this.form.patchValue(defaultReceiptFilter);
    (this.form.get("paidBy.value") as FormArray).clear();
    (this.form.get("categories.value") as FormArray).clear();
    (this.form.get("tags.value") as FormArray).clear();
    (this.form.get("status.value") as FormArray).clear();
  }

  public submitButtonClicked(): void {
    const filter = this.form.value;
    this.store
      .dispatch(new SetReceiptFilter(filter))
      .pipe(
        take(1),
        tap(() => {
          this.dialogRef.close(true);
        })
      )
      .subscribe();
  }

  public cancelButtonClicked(): void {
    this.dialogRef.close(false);
  }
}
