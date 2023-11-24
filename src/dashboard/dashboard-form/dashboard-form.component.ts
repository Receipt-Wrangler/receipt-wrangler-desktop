import { take, tap } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Store } from "@ngxs/store";
import {
  DashboardService, GroupState, UpsertWidgetCommand
} from "@receipt-wrangler/receipt-wrangler-core";

@UntilDestroy()
@Component({
  selector: 'app-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.scss'],
})
export class DashboardFormComponent implements OnInit {
  public headerText: string = '';

  public form: FormGroup = new FormGroup({});

  public get widgets(): FormArray {
    return this.form.get('widgets') as FormArray;
  }

  constructor(
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.initForm();
    this.listenForShowSummaryCardChanges();
  }

  public initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      groupId: [
        this.store.selectSnapshot(GroupState.selectedGroupId),
        Validators.required,
      ],
      showSummaryCard: [false],
      widgets: this.formBuilder.array([]),
    });
  }

  private listenForShowSummaryCardChanges(): void {
    this.form
      .get('showSummaryCard')
      ?.valueChanges.pipe(
        untilDestroyed(this),
        tap((value) => {
          if (value) {
            const formGroup = this.buildWidgetFormGroup({
              widgetType: UpsertWidgetCommand.WidgetTypeEnum.GROUPSUMMARY,
            });
            this.widgets.push(formGroup);
          } else {
            const index = this.widgets.controls.findIndex(
              (c) =>
                c.value.widgetType ===
                UpsertWidgetCommand.WidgetTypeEnum.GROUPSUMMARY
            );
            if (index > -1) {
              this.widgets.removeAt(index);
            }
          }
        })
      )
      .subscribe();
  }

  private buildWidgetFormGroup(
    upsertWidgetCommand: UpsertWidgetCommand
  ): FormGroup {
    return this.formBuilder.group({
      widgetType: [upsertWidgetCommand.widgetType, Validators.required],
    });
  }

  public submit(): void {
    if (this.form.valid) {
      this.dashboardService
        .createDashboard(this.form.value)
        .pipe(
          take(1),
          tap(() => {})
        )
        .subscribe();
    }
  }
}
