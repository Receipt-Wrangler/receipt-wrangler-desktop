import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FileData } from 'src/models/file-data';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent {
  @Input() images: FileData[] = [];
}
