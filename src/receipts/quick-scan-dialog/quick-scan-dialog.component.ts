import { Component, EmbeddedViewRef, OnInit, TemplateRef, ViewChild, } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBarRef } from "@angular/material/snack-bar";
import { Store } from "@ngxs/store";
import { ToggleShowProgressBar } from "src/store/layout.state.actions";
import { QuickScanCommand, ReceiptFileUploadCommand } from "../../interfaces";
import { ReceiptService, ReceiptStatus } from "../../open-api";
import { SnackbarService } from "../../services";
import { AuthState } from "../../store";
import { UploadImageComponent } from "../upload-image/upload-image.component";

@Component({
  selector: "app-quick-scan-dialog",
  templateUrl: "./quick-scan-dialog.component.html",
  styleUrls: ["./quick-scan-dialog.component.scss"],
})
export class QuickScanDialogComponent implements OnInit {
  @ViewChild(UploadImageComponent)
  public uploadImageComponent!: UploadImageComponent;

  @ViewChild("successfullScanSnackbar")
  public successfullScanSnackbarTemplate!: TemplateRef<any>;

  public form: FormGroup = new FormGroup({});

  public images: ReceiptFileUploadCommand[] = [];

  public quickScannedReceiptId: number = 0;

  public snackbarRef!: MatSnackBarRef<EmbeddedViewRef<any>>;

  public currentlySelectedIndex: number = 0;

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
    this.form = this.formBuilder.group({
      paidByUserIds: this.formBuilder.array<number>([]),
      statuses: this.formBuilder.array<ReceiptStatus>([]),
      groupIds: this.formBuilder.array<number>([]),
    });
  }

  public fileLoaded(fileData: ReceiptFileUploadCommand): void {
    if (fileData.file && !fileData.encodedImage) {
      fileData.url = URL.createObjectURL(fileData.file);
    }
    this.images.push(fileData);
    const userPreferences = this.store.selectSnapshot(AuthState.userPreferences);

    (this.form.get("paidByUserIds") as FormArray).push(new FormControl(userPreferences?.quickScanDefaultPaidById ?? "", Validators.required));
    (this.form.get("statuses") as FormArray).push(new FormControl(userPreferences?.quickScanDefaultStatus ?? "", Validators.required));
    (this.form.get("groupIds") as FormArray).push(new FormControl(userPreferences?.quickScanDefaultGroupId ?? "", Validators.required));

    console.warn("fileLoaded", fileData, this.images, this.form);
  }


  public openImageUploadComponent(): void {
    this.uploadImageComponent.clickInput();
  }

  public removeImage(index: number): void {
    this.images.splice(index, 1);
  }

  public submitButtonClicked(): void {
    if (this.form.valid && this.images.length > 0) {
      const command = this.buildQuickScanCommand();
      this.store.dispatch(new ToggleShowProgressBar());
      /*            this.receiptService
                    .quickScanReceipt(
                      [command.file],
                      command.groupId,
                      command.paidByUserId,
                      command.status
                    )
                    .pipe(
                      take(1),
                      tap((receipt) => {
                        this.quickScannedReceiptId = receipt.id;
                        this.snackbarRef = this.snackbarService.successFromTemplate(
                          this.successfullScanSnackbarTemplate,
                          {
                            duration: 8000,
                          }
                        );
                        this.dialogRef.close();
                      }),
                      finalize(() => this.store.dispatch(new ToggleShowProgressBar()))
                    )
                    .subscribe();*/
    }
    if (this.images.length === 0) {
      this.snackbarService.error("Please select an image to upload");
    }
  }

  private buildQuickScanCommand(): QuickScanCommand {
    const file = this.images[0];
    const command: QuickScanCommand = {
      file: file.file,
      groupId: Number(this.form.get("groupId")?.value),
      status: this.form.get("status")?.value,
      paidByUserId: Number(this.form.get("paidByUserId")?.value),
    };

    return command;
  }

  public cancelButtonClicked(): void {
    this.dialogRef.close();
  }

  public closeSnackbar(): void {
    this.snackbarRef.dismiss();
  }

  public setCurrentlySelectedIndex(index: number): void {
    this.currentlySelectedIndex = index;
  }
}
