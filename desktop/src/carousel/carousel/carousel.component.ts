import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FileData } from 'src/models/file-data';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent {
  @Input() public images: FileData[] = [];

  @Input() public disabled: boolean = false;

  @Output() public removeButtonClicked: EventEmitter<number> =
    new EventEmitter<number>();

  public emitRemoveButtonClicked(index: number): void {
    this.removeButtonClicked.emit(index);
  }
}
