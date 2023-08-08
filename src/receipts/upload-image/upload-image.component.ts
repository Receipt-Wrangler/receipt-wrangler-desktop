import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileData } from '@receipt-wrangler/receipt-wrangler-core';
import { FormMode } from 'src/enums/form-mode.enum';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent {
  @Input() public images: FileData[] = [];

  @Input() public receiptId?: string = '';

  @Input() public multiple: boolean = true;

  @Output() public fileLoaded: EventEmitter<FileData> = new EventEmitter();

  @ViewChild('uploadInput') uploadInput!: any;

  public formMode = FormMode;

  public acceptFileType: string = 'image/*';

  public clickInput(): void {
    this.uploadInput.nativeElement.click();
  }

  public async onFileChange(event: any): Promise<void> {
    const files: File[] = Array.from(event?.target?.files ?? []);
    const acceptedFiles = files.filter((f) =>
      new RegExp(this.acceptFileType).test(f.type)
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

        this.fileLoaded.emit(fileData);
      };

      reader.readAsBinaryString(f);
    }
  }
}
