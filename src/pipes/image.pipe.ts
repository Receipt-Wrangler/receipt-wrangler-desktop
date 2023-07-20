import { Pipe, PipeTransform } from "@angular/core";
import { FileData } from "@noah231515/receipt-wrangler-core";

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  public transform(image: FileData): string {
    const imageData = image.imageData as any as string;
    if (imageData.includes('data')) {
      return imageData;
    } else {
      return `data:${image.fileType};base64,${btoa(imageData)}`;
    }
  }
}
