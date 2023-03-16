import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptCommentsComponent } from './receipt-comments.component';

describe('ReceiptCommentsComponent', () => {
  let component: ReceiptCommentsComponent;
  let fixture: ComponentFixture<ReceiptCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptCommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
