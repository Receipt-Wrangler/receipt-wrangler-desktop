import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { take, tap } from "rxjs";
import { FormMode } from "src/enums/form-mode.enum";
import { ReceiptFileUploadCommand, ReceiptImageService } from "../../api";

@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrls: ["./upload-image.component.scss"],
})
export class UploadImageComponent {
  @Input() public receiptId?: string = "";

  @Input() public multiple: boolean = true;

  @Output() public fileLoaded: EventEmitter<ReceiptFileUploadCommand> =
    new EventEmitter();

  @ViewChild("uploadInput") uploadInput!: any;

  public formMode = FormMode;

  public acceptFileTypes: string[] = [
    "image/*",
    "application/pdf",
    "image/heic",
  ];

  constructor(private receiptImageService: ReceiptImageService) {}

  public clickInput(): void {
    this.uploadInput.nativeElement.click();
  }

  public async onFileChange(event: any): Promise<void> {
    const files: File[] = Array.from(event?.target?.files ?? []);
    const acceptedFiles = files.filter((f) =>
      this.acceptFileTypes.some((t) => new RegExp(t).test(f.type))
    );

    for (let i = 0; i < acceptedFiles.length; i++) {
      const reader = new FileReader();
      const f = acceptedFiles[i];

      reader.onload = () => {
        const command: ReceiptFileUploadCommand = {
          file: f,
          receiptId: Number(this.receiptId),
        };

        if (f.type === "application/pdf" || f.type === "image/heic") {
          this.receiptImageService
            .convertToJpgForm(f)
            .pipe(
              take(1),
              tap((encodedImage) => {
                command.encodedImage = encodedImage.encodedImage;
                this.fileLoaded.emit(command);
              })
            )
            .subscribe();
        } else {
          this.fileLoaded.emit(command);
        }
      };

      reader.readAsArrayBuffer(f);
    }
  }
}
