import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { prettyPrintJson } from "pretty-print-json";
import { fadeInOut } from "../../animations";
import { BaseFormComponent } from "../../form";
import { ReceiptFileUploadCommand } from "../../interfaces";
import { FormOption } from "../../interfaces/form-option.interface";
import { ImportType } from "../../open-api";
import { UploadImageComponent } from "../../receipts/upload-image/upload-image.component";
import { SnackbarService } from "../../services";

@Component({
  selector: "app-import-form",
  templateUrl: "./import-form.component.html",
  styleUrl: "./import-form.component.scss",
  animations: [fadeInOut],
})
export class ImportFormComponent extends BaseFormComponent implements OnInit {
  @ViewChild(UploadImageComponent)
  public uploadImageComponent!: UploadImageComponent;

  public readonly acceptedFileTypes = [
    "application/json",
  ];

  public file: File | null = null;

  public fileContents: SafeHtml = "";

  public test: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ImportFormComponent>,
    private snackbarService: SnackbarService,
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  public importTypeOptions: FormOption[] = [
    {
      value: ImportType.ImportConfig,
      displayValue: "Import Config"
    }
  ];

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      importType: [ImportType.ImportConfig, Validators.required],
    });
  }

  public openFileUploadDialog(): void {
    this.uploadImageComponent.clickInput();
  }

  public fileLoaded(fileData: ReceiptFileUploadCommand): void {
    this.file = fileData.file;

    const reader = new FileReader();
    reader.onload = () => {
      let rawResult = reader.result as string;
      rawResult = JSON.parse(rawResult);
      const dirtyHTML = prettyPrintJson.toHtml(
        rawResult, {
          indent: 2,
          lineNumbers: true,
          quoteKeys: true,
          linkUrls: true,
        });
      this.fileContents = this.sanitizer.bypassSecurityTrustHtml(dirtyHTML);
    };
    reader.readAsText(this.file);

  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public submit(): void {
    const importType = this.form.get("importType")?.value;
    switch (importType) {
      case ImportType.ImportConfig:
        this.handleImportConfigSubmit();
        break;
      default:
        this.snackbarService.error("Invalid import type");
    }
  }

  private handleImportConfigSubmit(): void {
    if (!this.file) {
      this.snackbarService.error("Please select a config file to import");
      return;
    }

  }

}
