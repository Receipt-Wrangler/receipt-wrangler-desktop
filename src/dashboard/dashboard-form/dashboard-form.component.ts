import { take, tap } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import {
  Dashboard,
  DashboardService,
  GroupState,
  SnackbarService,
  UpsertWidgetCommand,
  Widget,
} from '@receipt-wrangler/receipt-wrangler-core';

@UntilDestroy()
@Component({
  selector: 'app-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.scss'],
})
export class DashboardFormComponent implements OnInit {
  public headerText: string = '';

  public form: FormGroup = new FormGroup({});

  public dashboard?: Dashboard;

  public get widgets(): FormArray {
    return this.form.get('widgets') as FormArray;
  }

  constructor(
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private store: Store,
    private snackbarService: SnackbarService,
    private matDialogRef: MatDialogRef<DashboardFormComponent>
  ) {}

  public ngOnInit(): void {
    this.initForm();
    this.listenForShowSummaryCardChanges();
  }

  public initForm(): void {
    this.form = this.formBuilder.group({
      name: [this.dashboard?.name ?? '', Validators.required],
      groupId: [
        this.store.selectSnapshot(GroupState.selectedGroupId),
        Validators.required,
      ],
      showSummaryCard: [
        this?.dashboard?.widgets?.find(
          (w) => w.widgetType === Widget.WidgetTypeEnum.GROUPSUMMARY
        ) ?? false,
      ],
      widgets: this.formBuilder.array(
        this.dashboard?.widgets?.map((w) => this.buildWidgetFormGroup(w)) ?? []
      ),
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
            } as Widget);
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

  private buildWidgetFormGroup(widget: Widget): FormGroup {
    return this.formBuilder.group({
      widgetType: [widget.widgetType, Validators.required],
    });
  }

  public submit(): void {
    if (this.form.valid && !this.dashboard) {
      this.dashboardService
        .createDashboard(this.form.value)
        .pipe(
          take(1),
          tap((dashboard) => {
            this.snackbarService.success('Dashboard successfully created');
            this.matDialogRef.close(dashboard);
          })
        )
        .subscribe();
    } else if (this.form.valid && this.dashboard) {
      this.dashboardService
        .updateDashboard(this.form.value, this.dashboard.id)
        .pipe(
          take(1),
          tap((dashboard) => {
            this.snackbarService.success('Dashboard successfully updated');
            this.matDialogRef.close(dashboard);
          })
        )
        .subscribe();
    }
  }

  public cancelButtonClicked(): void {
    this.matDialogRef.close(undefined);
  }
}
