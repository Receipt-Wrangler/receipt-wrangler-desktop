import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselModule as NgxCarouselModule } from 'ngx-bootstrap/carousel';
import { PipesModule } from 'src/pipes/pipes.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ButtonModule } from '@receipt-wrangler/receipt-wrangler-core';

@NgModule({
  declarations: [CarouselComponent],
  imports: [
    CommonModule,
    PipesModule,
    NgxCarouselModule.forRoot(),
    MatButtonModule,
    MatIconModule,
    ImageCropperModule,
    ButtonModule,
  ],
  exports: [CarouselComponent],
})
export class CarouselModule {}
