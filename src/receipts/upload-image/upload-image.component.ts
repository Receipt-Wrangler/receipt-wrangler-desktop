import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FileData,
  ReceiptFileUploadCommand,
} from '@receipt-wrangler/receipt-wrangler-core';
import { FormMode } from 'src/enums/form-mode.enum';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent {
  @Input() public receiptId?: string = '';

  @Input() public multiple: boolean = true;

  @Output() public fileLoaded: EventEmitter<ReceiptFileUploadCommand> =
    new EventEmitter();

  @ViewChild('uploadInput') uploadInput!: any;

  public formMode = FormMode;

  public acceptFileTypes: string[] = ['image/*', 'application/pdf'];

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
        const fileData = {
          name: f.name,
          fileType: f.type,
          imageData: reader.result as string,
          size: f.size,
          receiptId: this.receiptId,
        } as any as FileData;

        const command: ReceiptFileUploadCommand = {
          file: f,
          receiptId: Number(this.receiptId),
        };

        this.fileLoaded.emit(command);
      };

      reader.readAsBinaryString(f);
    }
  }
}
