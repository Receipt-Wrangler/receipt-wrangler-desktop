import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselModule as NgxCarouselModule } from 'ngx-bootstrap/carousel';
import { PipesModule } from 'src/pipes/pipes.module';

@NgModule({
  declarations: [CarouselComponent],
  imports: [CommonModule, PipesModule, NgxCarouselModule.forRoot()],
  exports: [CarouselComponent],
})
export class CarouselModule {}
