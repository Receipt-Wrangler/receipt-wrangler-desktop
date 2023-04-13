import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImageComponent } from './upload-image.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

describe('UploadImageComponent', () => {
  let component: UploadImageComponent;
  let fixture: ComponentFixture<UploadImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadImageComponent],
      imports: [MatSnackBarModule, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: {} } } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
