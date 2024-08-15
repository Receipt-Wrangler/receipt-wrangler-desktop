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
import { widgetTypeOptions } from "../constants/widget-options";

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

  public widgetOpen: BehaviorSubject<number | undefined> = new BehaviorSubject<
    number | undefined
  >(undefined);

  public isAddingWidget: boolean = false;

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
          name: [widget.name, Validators.required],
          widgetType: [widget.widgetType, Validators.required],
        });
    }
  }

  public submit(): void {
    const canSubmit = this.form.valid && this.widgetOpen.value === undefined;

    if (this.widgetOpen.value !== undefined) {
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
        .updateDashboard(this.dashboard.id, this.form.value)
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

  public openWidget(index: number): void {
    this.widgetOpen.next(index);
  }

  public closeWidget(): void {
    this.widgetOpen.next(undefined);
  }

  public submitWidget(index: number): void {
    const widget = (this.widgets.at(index) as FormGroup).value;

    if (widget["widgetType"] === WidgetType.FilteredReceipts) {
      this.filterSubmitted();
    } else {
      this.closeWidget();
    }
  }

  public cancelButtonClicked(): void {
    this.matDialogRef.close(undefined);
  }

  public addFilteredReceiptWidget(): void {
    const formGroup = this.buildWidgetFormGroup({
      widgetType: WidgetType.FilteredReceipts,
    } as Widget);
    this.widgetOpen.next(this.widgets.length);
    this.widgets.push(formGroup);
    this.isAddingWidget = true;
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

  public cancelWidgetEdit(): void {
    if (this.isAddingWidget) {
      this.widgets.removeAt(this.widgets.length - 1);
      this.widgetOpen.next(undefined);
      this.isAddingWidget = false;
    } else {
      const widget = this.originalWidgets[this.widgetOpen.value as number];

      if (widget.widgetType === WidgetType.FilteredReceipts) {
        this.patchFilterConfig(widget);
      } else {
        this.widgets.at(this.widgetOpen.value as number).patchValue(widget);
      }
      this.widgetOpen.next(undefined);
    }
  }

  public filterSubmitted(): void {
    if (this.isAddingWidget) {
      const widget = this.widgets.at(this.widgets.length - 1) as FormGroup;
      if (widget.valid) {
        const form = this.receiptFilterComponents.last.form;
        widget.get("configuration")?.patchValue(form.value);
        this.originalWidgets.push(widget.value);

        this.widgetOpen.next(undefined);
        this.isAddingWidget = false;
      }
    } else {
      const widget = this.widgets.at(
        this.widgetOpen.value as number
      ) as FormGroup;

      if (widget.valid) {
        const form = this.receiptFilterComponents.first.form;
        widget.get("configuration")?.patchValue(form.value);
        this.originalWidgets.splice(
          this.widgetOpen.value as number,
          1,
          widget.value
        );

        this.widgetOpen.next(undefined);
      }
    }
  }

  private patchFilterConfig(widget: Widget): void {
    const originalWidget =
      this.originalWidgets[this.widgetOpen.value as number];
    this.receiptFilterComponents.first.filter = originalWidget.configuration;
    this.receiptFilterComponents.first.ngOnInit();
  }

  public editFilter(index: number): void {
    this.widgetOpen.next(index);
  }

  public removeFilter(index: number): void {
    this.widgets.removeAt(index);
    this.originalWidgets.splice(index, 1);
  }

  protected readonly WidgetType = WidgetType;
  protected readonly widgetTypeOptions = widgetTypeOptions;
}
