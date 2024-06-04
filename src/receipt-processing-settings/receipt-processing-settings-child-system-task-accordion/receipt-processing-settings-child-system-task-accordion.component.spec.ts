import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptProcessingSettingsChildSystemTaskAccordionComponent } from './receipt-processing-settings-child-system-task-accordion.component';

describe('ReceiptProcessingSettingsChildSystemTaskAccordionComponent', () => {
  let component: ReceiptProcessingSettingsChildSystemTaskAccordionComponent;
  let fixture: ComponentFixture<ReceiptProcessingSettingsChildSystemTaskAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceiptProcessingSettingsChildSystemTaskAccordionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptProcessingSettingsChildSystemTaskAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
