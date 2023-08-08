import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileData } from '@receipt-wrangler/receipt-wrangler-core';
import { UploadImageComponent } from '../upload-image/upload-image.component';

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

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      paidByUserId: [null, Validators.required],
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
}
