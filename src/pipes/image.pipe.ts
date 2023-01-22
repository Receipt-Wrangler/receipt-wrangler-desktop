import { Pipe, PipeTransform } from '@angular/core';
import { FileData } from 'src/models/file-data';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  public transform(image: FileData): string {
    if (image.imageData.includes('data')) {
      return image.imageData;
    } else {
      return `data:${image.fileType};base64,${btoa(image.imageData)}`;
    }
  }
}
