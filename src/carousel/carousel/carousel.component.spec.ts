import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule as NgxCarouselModule } from 'ngx-bootstrap/carousel';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ButtonModule } from 'src/button/button.module';
import { PipesModule } from 'src/pipes/pipes.module';
import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
