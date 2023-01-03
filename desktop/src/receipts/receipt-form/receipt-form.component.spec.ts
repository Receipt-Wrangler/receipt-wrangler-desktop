import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptFormComponent } from './receipt-form.component';

describe('ReceiptFormComponent', () => {
  let component: ReceiptFormComponent;
  let fixture: ComponentFixture<ReceiptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
