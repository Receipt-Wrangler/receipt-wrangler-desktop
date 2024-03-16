import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Store } from "@ngxs/store";
import { BehaviorSubject, take, tap } from "rxjs";
import { ReceiptFilterComponent } from "src/shared-ui/receipt-filter/receipt-filter.component";
import { Dashboard, DashboardService, Widget, WidgetType } from "../../open-api";
import { SnackbarService } from "../../services";
import { GroupState } from "../../store";

@UntilDestroy()
@Component({
  selector: "app-dashboard-form",
  templateUrl: "./dashboard-form.component.html",
  styleUrls: ["./dashboard-form.component.scss"],
})
export class DashboardFormComponent implements OnInit {
  @ViewChildren(ReceiptFilterComponent)
  public receiptFilterComponents!: QueryList<ReceiptFilterComponent>;

  public headerText: string = "";

  public form: FormGroup = new FormGroup({});

  public dashboard?: Dashboard;

  public WidgetTypeEnum = WidgetType;

  public filterOpen: BehaviorSubject<number | undefined> = new BehaviorSubject<
    number | undefined
  >(undefined);

  public filterIsAdd: boolean = false;

  public originalWidgets: Widget[] = [];

  public get widgets(): FormArray {
    return this.form.get("widgets") as FormArray;
  }

  constructor(
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private store: Store,
    private snackbarService: SnackbarService,
    private matDialogRef: MatDialogRef<DashboardFormComponent>
  ) {}

  public ngOnInit(): void {
    this.originalWidgets = this.dashboard?.widgets ?? [];
    this.initForm();
    this.listenForShowSummaryCardChanges();
  }

  public initForm(): void {
    this.form = this.formBuilder.group({
      name: [this.dashboard?.name ?? "", Validators.required],
      groupId: [
        this.store.selectSnapshot(GroupState.selectedGroupId),
        Validators.required,
      ],
      showSummaryCard: [
        this?.dashboard?.widgets?.find(
          (w) => w.widgetType === WidgetType.GroupSummary
        ) ?? false,
      ],
      widgets: this.formBuilder.array(
        this.dashboard?.widgets?.map((w) => this.buildWidgetFormGroup(w)) ?? []
      ),
    });
  }

  private listenForShowSummaryCardChanges(): void {
    this.form
      .get("showSummaryCard")
      ?.valueChanges.pipe(
      untilDestroyed(this),
      tap((value) => {
        if (value) {
          const formGroup = this.buildWidgetFormGroup({
            widgetType: WidgetType.GroupSummary,
          } as Widget);
          this.widgets.push(formGroup);
        } else {
          const index = this.widgets.controls.findIndex(
            (c) => c.value.widgetType === WidgetType.GroupSummary
          );
          if (index > -1) {
            this.widgets.removeAt(index);
          }
        }
      })
    )
      .subscribe();
  }

  private buildWidgetFormGroup(widget: Widget): FormGroup {
    switch (widget.widgetType) {
      case WidgetType.FilteredReceipts:
        return this.formBuilder.group({
          name: [widget.name, Validators.required],
          widgetType: [widget.widgetType, Validators.required],
        });
      default:
        return this.formBuilder.group({
          widgetType: [widget.widgetType, Validators.required],
        });
    }
  }

  public submit(): void {
    const canSubmit = this.form.valid && this.filterOpen.value === undefined;

    if (this.filterOpen.value !== undefined) {
      this.snackbarService.error(
        "Please finish editing the open filter before submitting"
      );
      return;
    }

    if (canSubmit && !this.dashboard) {
      this.dashboardService
        .createDashboard(this.form.value)
        .pipe(
          take(1),
          tap((dashboard) => {
            this.snackbarService.success("Dashboard successfully created");
            this.matDialogRef.close(dashboard);
          })
        )
        .subscribe();
    } else if (canSubmit && this.dashboard) {
      this.dashboardService
        .updateDashboard(this.form.value, this.dashboard.id)
        .pipe(
          take(1),
          tap((dashboard) => {
            this.snackbarService.success("Dashboard successfully updated");
            this.matDialogRef.close(dashboard);
          })
        )
        .subscribe();
    }
  }

  public cancelButtonClicked(): void {
    this.matDialogRef.close(undefined);
  }

  public addFilteredReceiptWidget(): void {
    const formGroup = this.buildWidgetFormGroup({
      widgetType: WidgetType.FilteredReceipts,
    } as Widget);
    this.filterOpen.next(this.widgets.length);
    this.widgets.push(formGroup);
    this.filterIsAdd = true;
  }

  public addFilterToWidget(
    filterFormGroup: FormGroup,
    widgetIndex: number
  ): void {
    (this.widgets.at(widgetIndex) as FormGroup).addControl(
      "configuration",
      filterFormGroup
    );
  }

  public cancelFilter(): void {
    if (this.filterIsAdd) {
      this.widgets.removeAt(this.widgets.length - 1);
      this.filterOpen.next(undefined);
      this.filterIsAdd = false;
    } else {
      const widget = this.originalWidgets[this.filterOpen.value as number];
      this.patchFilterConfig(widget);
      this.filterOpen.next(undefined);
    }
  }

  public filterSubmitted(): void {
    if (this.filterIsAdd) {
      const widget = this.widgets.at(this.widgets.length - 1) as FormGroup;
      if (widget.valid) {
        const form = this.receiptFilterComponents.last.form;
        widget.get("configuration")?.patchValue(form.value);
        this.originalWidgets.push(widget.value);

        this.filterOpen.next(undefined);
        this.filterIsAdd = false;
      }
    } else {
      const widget = this.widgets.at(
        this.filterOpen.value as number
      ) as FormGroup;

      if (widget.valid) {
        const form = this.receiptFilterComponents.first.form;
        widget.get("configuration")?.patchValue(form.value);
        this.originalWidgets.splice(
          this.filterOpen.value as number,
          1,
          widget.value
        );

        this.filterOpen.next(undefined);
      }
    }
  }

  private patchFilterConfig(widget: Widget): void {
    const originalWidget =
      this.originalWidgets[this.filterOpen.value as number];
    this.receiptFilterComponents.first.filter = originalWidget.configuration;
    this.receiptFilterComponents.first.ngOnInit();
  }

  public editFilter(index: number): void {
    this.filterOpen.next(index);
  }

  public removeFilter(index: number): void {
    this.widgets.removeAt(index);
    this.originalWidgets.splice(index, 1);
  }
}
