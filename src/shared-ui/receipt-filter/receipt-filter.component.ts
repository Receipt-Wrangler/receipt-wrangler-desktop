import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, } from "@angular/core";
import { FormControl, FormGroup, } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngxs/store";
import { endOfDay, startOfMonth } from "date-fns";
import { forkJoin, take, tap } from "rxjs";
import { RECEIPT_STATUS_OPTIONS } from "src/constants";
import { SetReceiptFilter } from "src/store/receipt-table.actions";
import { FormCommand } from "../../form/index";
import { Category, CategoryService, FilterOperation, Tag, TagService } from "../../open-api";

@Component({
    selector: "app-receipt-filter",
    templateUrl: "./receipt-filter.component.html",
    styleUrls: ["./receipt-filter.component.scss"],
    standalone: false
})
export class ReceiptFilterComponent implements OnInit {
  @Input() public headerText: string = "";

  @Input() public footerTemplate?: TemplateRef<any>;

  @Input() public isOpen: boolean = true;

  @Input() public previewTemplate?: TemplateRef<any>;

  @Input() public previewTemplateContext?: any;

  @Input() public inDialog: boolean = true;

  @Input() public parentForm: FormGroup = new FormGroup({});

  @Input() public basePath: string = "";

  @Output() public formCommand: EventEmitter<FormCommand> = new EventEmitter<FormCommand>();

  @Output() public formInitialized: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();

  public receiptStatusOptions = RECEIPT_STATUS_OPTIONS;

  public categories: Category[] = [];

  public tags: Tag[] = [];

  public startOfMonthFormControl = new FormControl(startOfMonth(new Date()));

  public endOfTodayFormControl = new FormControl(endOfDay(new Date()));


  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<ReceiptFilterComponent>,
    private categoryService: CategoryService,
    private tagService: TagService
  ) {}

  public ngOnInit(): void {
    this.startOfMonthFormControl.disable();
    this.endOfTodayFormControl.disable();

    forkJoin([
      this.categoryService.getAllCategories(),
      this.tagService.getAllTags(),
    ])
      .pipe(
        take(1),
        tap(([categories, tags]) => {
          this.categories = categories;
          this.tags = tags;
        })
      )
      .subscribe();
  }

  public resetFilter(): void {
    this.formCommand.emit({
      path: `${this.basePath}`,
      command: "reset",
    });
    this.formCommand.emit({
      path: `${this.basePath}paidBy.value`,
      command: "clear",
    });
    this.formCommand.emit({
      path: `${this.basePath}categories.value`,
      command: "clear",
    });
    this.formCommand.emit({
      path: `${this.basePath}tags.value`,
      command: "clear",
    });
    this.formCommand.emit({
      path: `${this.basePath}status.value`,
      command: "clear",
    });
  }

  public submitButtonClicked(): void {
    const filter = this.parentForm.value;

    if (this.parentForm.valid) {
      this.store
        .dispatch(new SetReceiptFilter(filter))
        .pipe(
          take(1),
          tap(() => {
            this.dialogRef.close(true);
          })
        )
        .subscribe();
    } else {
      this.parentForm.markAllAsTouched();
    }
  }

  public cancelButtonClicked(): void {
    this.dialogRef.close(false);
  }

  protected readonly FilterOperation = FilterOperation;
}
