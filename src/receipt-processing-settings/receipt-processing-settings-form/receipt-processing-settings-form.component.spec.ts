import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptProcessingSettingsFormComponent } from './receipt-processing-settings-form.component';

describe('ReceiptProcessingSettingsFormComponent', () => {
  let component: ReceiptProcessingSettingsFormComponent;
  let fixture: ComponentFixture<ReceiptProcessingSettingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceiptProcessingSettingsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptProcessingSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
