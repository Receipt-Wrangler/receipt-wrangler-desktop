import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core";

@Component({
  selector: "app-image-viewer",
  templateUrl: "./image-viewer.component.html",
  styleUrl: "./image-viewer.component.scss"
})
export class ImageViewerComponent {
  @HostListener("wheel", ["$event"])
  public onWheel(event: WheelEvent) {
    this.wheel.emit(event);
  }

  @Input() public imageBase64?: string = "";

  @Input() public scale: number = 1;

  @Output() public wheel: EventEmitter<WheelEvent> = new EventEmitter<WheelEvent>();
}
