import { Component, EmbeddedViewRef, OnInit, TemplateRef, ViewChild, } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBarRef } from "@angular/material/snack-bar";
import { Store } from "@ngxs/store";
import { finalize, take, tap } from "rxjs";
import { ToggleShowProgressBar } from "src/store/layout.state.actions";
import { QuickScanCommand, ReceiptFileUploadCommand, ReceiptService } from "../../api";
import { SnackbarService } from "../../services";
import { AuthState, GroupState } from "../../store";
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

  public imageBlobUrl: string = "";

  public encodedImage: string = "";

  public quickScannedReceiptId: number = 0;

  public snackbarRef!: MatSnackBarRef<EmbeddedViewRef<any>>;

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
    let selectedGroupId: string | undefined = this.store.selectSnapshot(
      GroupState.selectedGroupId
    );
    if (selectedGroupId === "all") {
      selectedGroupId = undefined;
    }
    const userPreferences = this.store.selectSnapshot(
      AuthState.userPreferences
    );
    this.form = this.formBuilder.group({
      paidByUserId: [
        userPreferences?.quickScanDefaultPaidById ?? undefined,
        Validators.required,
      ],
      status: [
        userPreferences?.quickScanDefaultStatus ?? undefined,
        Validators.required,
      ],
      groupId: [
        userPreferences?.quickScanDefaultGroupId ?? undefined,
        Validators.required,
      ],
    });
  }

  public fileLoaded(fileData: ReceiptFileUploadCommand): void {
    this.images.push(fileData);
    this.imageBlobUrl = URL.createObjectURL(fileData.file);
    this.encodedImage = fileData.encodedImage ?? "";
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
      this.receiptService
        .quickScanReceiptForm(
          command.file,
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
        .subscribe();
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
}
