import { ImageTransform } from 'ngx-image-cropper';
import { FormMode } from 'src/enums/form-mode.enum';

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {
  FileDataView,
  ReceiptFileUploadCommand,
} from '@receipt-wrangler/receipt-wrangler-core';
import { Observable, of, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

interface CarouselDatasource {
  blob?: File;
  encodedImage?: string;
}

@UntilDestroy()
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent {
  @Input() public images: FileDataView[] = [];

  @Input() public imagePreviews: ReceiptFileUploadCommand[] = [];

  @Input() public disabled: boolean = false;

  @Input() public mode!: FormMode;

  @Input() public hideButtonControls: boolean = false;

  @Output() public removeButtonClicked: EventEmitter<number> =
    new EventEmitter<number>();

  public datasource: CarouselDatasource[] = [];

  public scale: number = 1;

  public transform: ImageTransform = {};

  public currentlyShownImageIndex: number = -1;

  public emitRemoveButtonClicked(index: number): void {
    this.removeButtonClicked.emit(index);
  }

  public zoomOut() {
    this.adjustScale(-0.1);
  }

  public zoomIn() {
    this.adjustScale(0.1);
  }

  public onScroll(event: WheelEvent): void {
    event.preventDefault();
    let value = event.deltaY * -0.001;
    this.adjustScale(value);
  }

  public updateCurrentlyShownImage(index: number): void {
    this.currentlyShownImageIndex = index;
  }

  public adjustScale(amount: number): void {
    const newScale = this.scale + amount;
    this.scale = Math.max(newScale, 0.1);
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }
}
