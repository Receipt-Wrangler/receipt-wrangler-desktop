import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { of } from 'rxjs';
import { PipesModule } from 'src/pipes/pipes.module';
import { ReceiptFormComponent } from './receipt-form.component';

describe('ReceiptFormComponent', () => {
  let component: ReceiptFormComponent;
  let fixture: ComponentFixture<ReceiptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceiptFormComponent],
      imports: [
        NgxsModule.forRoot([]),
        HttpClientTestingModule,
        ReactiveFormsModule,
        PipesModule,
        MatSnackBarModule,
        MatDialogModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: {} }, params: of({}) },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceiptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
