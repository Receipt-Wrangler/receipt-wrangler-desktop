import { Component, Input } from '@angular/core';
import { FormMode } from 'src/enums/form-mode.enum';
import { FileData } from 'src/models/file-data';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent {
  @Input() public images: FileData[] = [];

  @Input() public receiptId: string = '';

  @Input() public mode: FormMode = FormMode.view;

  public acceptFileType: string = 'image/*';

  public onFileChange(event: any): void {
    console.log(event);
    console.log(event?.target?.files, 'files');
    const files: File[] = Array.from(event?.target?.files ?? []);
    const acceptedFiles = files.filter((f) =>
      new RegExp(this.acceptFileType).test(f.type)
    );

    acceptedFiles.forEach((f) => {
      const fileData = {} as FileData;
    });
  }
}
