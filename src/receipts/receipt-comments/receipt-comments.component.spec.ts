import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptCommentsComponent } from './receipt-comments.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PipesModule } from 'src/pipes/pipes.module';
import { TopLevelCommentPipe } from './top-level-comment.pipe';

describe('ReceiptCommentsComponent', () => {
  let component: ReceiptCommentsComponent;
  let fixture: ComponentFixture<ReceiptCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceiptCommentsComponent, TopLevelCommentPipe],
      imports: [
        ReactiveFormsModule,
        NgxsModule.forRoot([]),
        HttpClientTestingModule,
        MatSnackBarModule,
        PipesModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceiptCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
