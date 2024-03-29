import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CarouselModule as NgxCarouselModule } from "ngx-bootstrap/carousel";
import { ImageCropperModule } from "ngx-image-cropper";
import { PipesModule } from "src/pipes/pipes.module";
import { ButtonModule } from "../button";
import { CarouselComponent } from "./carousel/carousel.component";

@NgModule({
  declarations: [CarouselComponent],
  imports: [
    ButtonModule,
    CommonModule,
    ImageCropperModule,
    MatButtonModule,
    MatIconModule,
    NgxCarouselModule.forRoot(),
    PipesModule,
  ],
  exports: [CarouselComponent],
})
export class CarouselModule {}
