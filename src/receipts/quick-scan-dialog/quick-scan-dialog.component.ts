import { take, tap } from 'rxjs';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FileData,
  GroupState,
  QuickScanCommand,
  Receipt,
  ReceiptService,
  SnackbarService,
} from '@receipt-wrangler/receipt-wrangler-core';

import { UploadImageComponent } from '../upload-image/upload-image.component';
import { binaryStringToBinaryArray } from '../utils/form.utils';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-quick-scan-dialog',
  templateUrl: './quick-scan-dialog.component.html',
  styleUrls: ['./quick-scan-dialog.component.scss'],
})
export class QuickScanDialogComponent implements OnInit {
  @ViewChild(UploadImageComponent)
  public uploadImageComponent!: UploadImageComponent;

  public form: FormGroup = new FormGroup({});

  public images: FileData[] = [];

  constructor(
    private dialogRef: MatDialogRef<QuickScanDialogComponent>,
    private formBuilder: FormBuilder,
    private receiptService: ReceiptService,
    private snackbarService: SnackbarService,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    const selectedGroupId = this.store.selectSnapshot(
      GroupState.selectedGroupId
    );
    this.form = this.formBuilder.group({
      paidByUserId: [null, Validators.required],
      status: [Receipt.StatusEnum.OPEN, Validators.required],
      groupId: [selectedGroupId, Validators.required],
    });
  }

  public fileLoaded(fileData: FileData): void {
    this.images.push(fileData);
  }

  public openImageUploadComponent(): void {
    this.uploadImageComponent.clickInput();
  }

  public removeImage(index: number): void {
    this.images.splice(index, 1);
  }

  public submitButtonClicked(): void {
    if (this.form.valid) {
      const command = this.buildQuickScanCommand();
      console.warn(command);
      this.receiptService
        .quickScanReceipt(command, undefined, true)
        .pipe(
          take(1),
          tap((receipt) => {
            this.snackbarService.success(
              `${receipt.name} receipt successfully scanned`
            );
            this.dialogRef.close();
          })
        )
        .subscribe();
    }
  }

  private buildQuickScanCommand(): QuickScanCommand {
    const file = this.images[0];
    const command: QuickScanCommand = {
      imageData: binaryStringToBinaryArray((file.imageData as any) ?? ''),
      name: file.name as string,
      fileType: file.fileType as string,
      size: file.size as number,
      groupId: Number(this.form.get('groupId')?.value),
      status: this.form.get('status')?.value,
      paidByUserId: this.form.get('paidByUserId')?.value,
    };

    return command;
  }

  public cancelButtonClicked(): void {
    this.dialogRef.close();
  }
}
