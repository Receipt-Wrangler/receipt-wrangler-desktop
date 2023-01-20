import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptsTableComponent } from './receipts-table.component';

describe('ReceiptsTableComponent', () => {
  let component: ReceiptsTableComponent;
  let fixture: ComponentFixture<ReceiptsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
