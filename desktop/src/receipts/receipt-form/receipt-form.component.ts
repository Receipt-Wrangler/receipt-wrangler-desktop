import { DEFAULT_INTERPOLATION_CONFIG } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import {
  DEFAULT_SNACKBAR_CONFIG,
  DEFAULT_SNACKBAR_ACTION,
} from 'constants/index';

import { Observable, take, tap } from 'rxjs';
import { ReceiptsService } from 'src/api/receipts.service';
import { Category, Receipt, Tag } from 'src/models';
import { User } from 'src/models/user';
import { UserState } from 'src/store/user.state';
import { ItemListComponent } from '../item-list/item-list.component';
import { QuickActionsDialogComponent } from '../quick-actions-dialog/quick-actions-dialog.component';

@Component({
  selector: 'app-receipt-form',
  templateUrl: './receipt-form.component.html',
  styleUrls: ['./receipt-form.component.scss'],
})
export class ReceiptFormComponent implements OnInit {
  @ViewChild(ItemListComponent) itemsListComponent!: ItemListComponent;

  public categories: Category[] = [];

  public tags: Tag[] = [];

  public originalReceipt?: Receipt;

  constructor(
    private receiptsService: ReceiptsService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private matDialog: MatDialog
  ) {}

  public form: FormGroup = new FormGroup({});

  public ngOnInit(): void {
    this.categories = this.activatedRoute.snapshot.data['categories'];
    this.tags = this.activatedRoute.snapshot.data['tags'];
    this.originalReceipt = this.activatedRoute.snapshot.data['receipt'];
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [this.originalReceipt?.name ?? '', Validators.required],
      amount: [
        this.originalReceipt?.amount ?? '',
        [Validators.required, Validators.min(1)],
      ],
      categories: this.formBuilder.array(
        this.originalReceipt?.categories ?? []
      ),
      tags: this.formBuilder.array(this.originalReceipt?.tags ?? []),
      date: [this.originalReceipt?.date ?? new Date(), Validators.required],
      paidByUserId: [
        this.originalReceipt?.paidByUserId ?? '',
        Validators.required,
      ],
      isResolved: this.originalReceipt?.isResolved ?? false,
    });
  }

  public openQuickActionsModal(): void {
    const dialogRef = this.matDialog.open(QuickActionsDialogComponent);

    dialogRef.componentInstance.parentForm = this.form;
    dialogRef.componentInstance.originalReceipt = this.originalReceipt;

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result: boolean) => {
        if (result) {
          this.itemsListComponent.setUserItemMap();
        }
      });
  }

  public submit(): void {
    if (this.originalReceipt && this.form.valid) {
      this.receiptsService
        .updateReceipt(this.originalReceipt.id.toString(), this.form.value)
        .pipe(
          tap(() => {
            this.snackbar.open(
              'Successfully updated receipt',
              DEFAULT_SNACKBAR_ACTION,
              DEFAULT_SNACKBAR_CONFIG
            );
          })
        )
        .subscribe();
    } else if (!this.originalReceipt && this.form.valid) {
      this.receiptsService
        .createReceipt(this.form.value)
        .pipe(
          tap(() => {
            this.snackbar.open(
              'Successfully added receipt',
              DEFAULT_SNACKBAR_ACTION,
              DEFAULT_SNACKBAR_CONFIG
            );
          })
        )
        .subscribe();
    }
  }
}
