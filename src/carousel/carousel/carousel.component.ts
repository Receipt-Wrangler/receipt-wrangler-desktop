import { ImageTransform } from "ngx-image-cropper";
import { FormMode } from "src/enums/form-mode.enum";

import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { FileData } from "@noah231515/receipt-wrangler-core";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent {
  @Input() public images: FileData[] = [];

  @Input() public disabled: boolean = false;

  @Input() public mode!: FormMode;

  @Input() public hideButtonControls: boolean = false;

  @Output() public removeButtonClicked: EventEmitter<number> =
    new EventEmitter<number>();

  public emitRemoveButtonClicked(index: number): void {
    this.removeButtonClicked.emit(index);
  }

  public scale: number = 1;

  public transform: ImageTransform = {};

  public currentlyShownImageIndex: number = -1;

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
