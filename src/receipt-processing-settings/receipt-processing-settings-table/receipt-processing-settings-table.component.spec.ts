import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptProcessingSettingsTableComponent } from './receipt-processing-settings-table.component';

describe('ReceiptProcessingSettingsTableComponent', () => {
  let component: ReceiptProcessingSettingsTableComponent;
  let fixture: ComponentFixture<ReceiptProcessingSettingsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptProcessingSettingsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptProcessingSettingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
