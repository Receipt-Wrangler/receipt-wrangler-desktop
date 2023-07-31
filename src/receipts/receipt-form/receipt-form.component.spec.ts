import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import {
  ApiModule,
  PipesModule as CorePipesModule,
} from '@noah231515/receipt-wrangler-core';
import { of } from 'rxjs';
import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { ReceiptFormComponent } from './receipt-form.component';
import { PipesModule } from 'src/pipes/pipes.module';

describe('ReceiptFormComponent', () => {
  let component: ReceiptFormComponent;
  let fixture: ComponentFixture<ReceiptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceiptFormComponent],
      imports: [
        ApiModule,
        CorePipesModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule,
        NgxsModule.forRoot([]),
        PipesModule,
        ReactiveFormsModule,
        SharedUiModule,
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
